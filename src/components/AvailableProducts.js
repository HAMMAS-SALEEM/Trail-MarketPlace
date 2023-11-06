import React, { useEffect } from 'react';
import { SingleItem } from './SingleItem';
import { fetchProducts } from '../store/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';


export const AvailableProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products);
  const purchases = useSelector((state) => state.currency);

  const handleBooks = (products, purchases) => {
    console.log(products, purchases)
    if(purchases.currency.purchases === 'N/A') {
      return null;
    }

    const purchasedProductIds = new Set(purchases.currency.purchases);
    const mergedData = products.products.data.map(product => ({
        ...product,
        alreadypurchased: purchasedProductIds.has(product.id)
    }));

    let result = [...mergedData]
    console.log(result);
    let totalProducts = '';
    totalProducts = mergedData.map((item) => (
      <SingleItem
        key={item.id}
        name={item.attributes.name}
        price={item.attributes.cost}
        img={item.attributes.image}
        desc={item.attributes.description}
        alreadyPurchased={item.alreadyPurchased}
      />
    ))
    return totalProducts;
  }

  useEffect(() => {
    if(products.status === 'idle'){
      dispatch(fetchProducts());
    }
  }, [dispatch, products.status])

    if(products.status === 'loading') return <div>Loading...</div>;

    if(products.status === 'failed') return <div>Some Problems Occuring</div>;

    return (
      <div className="items-container">
        {(products.status === 'succeeded' && purchases.status === 'succeeded') &&  handleBooks(products, purchases)}
      </div>
  )
}
