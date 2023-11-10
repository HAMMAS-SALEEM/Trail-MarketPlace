import React, { useEffect } from 'react';
import { SingleItem } from './SingleItem';
import { fetchProducts } from '../store/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralStore } from '../components/GeneralStore'
import { ThreeDots } from 'react-loader-spinner';
import { Prod } from './Prod';
// import { products, purchases } from './sampleProducts';

export const AvailableProducts = ({session}) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products);
  const purchases = useSelector((state) => state.currency);

  const handleProducts = (products, purchases) => {
    const purchasedProductIds = new Set(purchases.currency.purchases.map(str => parseInt(str, 10)));
    const mergedData = products.products.data.map(product => ({
        ...product,
        alreadypurchased: purchasedProductIds.has(product.id)
    }));

    let totalProducts = '';
    totalProducts = mergedData.map((item) => (
      <SingleItem
        key={item.id}
        id={item.id}
        name={item.attributes.name}
        price={item.attributes.cost}
        img={item.attributes.image}
        desc={item.attributes.description}
        alreadyPurchased={item.alreadypurchased}
      />
    ))
    return totalProducts;
  }

  useEffect(() => {
    if(products.status === 'idle'){
      dispatch(fetchProducts());
    }
  }, [dispatch, products.status])

    if(products.status === 'failed') return <div>Some Problems Occuring</div>;

    return (
      <div className="products-section" id="store">
        <GeneralStore />
        {
          session && (products.status !== 'succeeded' || purchases.status !== 'succeeded') && <div className="spinner-products">
          <ThreeDots 
          height="400" 
          width= "400" 
          radius="9"
          color="#4fa94d" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
         />
        </div>
        }
        {
          (!session && products.status !== 'succeeded') && <div className="spinner-products">
          <ThreeDots 
          height="400" 
          width= "400" 
          radius="9"
          color="#4fa94d" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
         />
        </div>
        }
      <div className="items-container">
        {
          (products.status === 'succeeded' && !session) && products.products.data
          .map((item) => (
            <Prod img={item.attributes.image} name={item.attributes.name} price={item.attributes.cost} />
          ))
        }

        {(products.status === 'succeeded' && purchases.status === 'succeeded' && purchases.currency.purchases !== 'N/A') &&  handleProducts(products, purchases) }
      </div>
      </div>
  )
}
