import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../store/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralStore } from '../components/GeneralStore'
import { ThreeDots } from 'react-loader-spinner';
import { Prod } from './Prod';
import arrowMore from '../assets/arrowMore.svg'
import { handleProducts } from '../utils/handleProducts';
import { MoreButton } from './MoreButton';

export const AvailableProducts = ({session}) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products);
  const purchases = useSelector((state) => state.currency);
  const [pagination, setPagination] = useState(0);

  const handlePagination = () => {
    const state = [...products.products.data]
    const nextItem = pagination+10
    dispatch(fetchProducts(nextItem, state))
    setPagination(nextItem);
  }

  const retryFetchProducts = () => {
    dispatch(fetchProducts(pagination))
  }

  useEffect(() => {
    if(products.status === 'idle'){
      dispatch(fetchProducts(pagination));
    }
  }, [dispatch, products.status, pagination])

    if(products.status === 'failed') return <div>Some Problems Occuring</div>;

    return (
      <div className="products-section" id="store">
        <GeneralStore />
        {
          (session && ((products.status !== 'succeeded' || purchases.status !== 'succeeded'))) && <div className="spinner-products">
          <ThreeDots 
          height="400" 
          width= "400" 
          radius="9"
          color="#4fa94d" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{width: '200px'}}
          wrapperClassName=""
          visible={true}
         />
        </div>
        }
        {
          (!session && products.status !== 'succeeded') && 
          <div className="spinner-products">
            <ThreeDots 
              height="400" 
              width= "400" 
              radius="9"
              color="#4fa94d" 
              ariaLabel="three-dots-loading"
              wrapperStyle={{width: '200px'}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        }
        {
          ((products.status === 'failed' || purchases.status === 'failed')) &&
          <div className="retry-fetch-project-btn-container">
            <button onClick={retryFetchProducts} className="retry-fetch-projects-button">Retry...</button>
          </div>
        }
      <div className="items-container">
        {
          (products.status === 'succeeded' && !session) && products.products.data
          .map((item, idx) => (
            <Prod key={idx+item.attributes.image+item.attributes.name+item.attributes.cost} img={item.attributes.image} name={item.attributes.name} price={item.attributes.cost} />
          ))
        }

        {((session && products.status === 'succeeded' && purchases.status === 'succeeded' && purchases.currency.purchases !== 'N/A')) &&  handleProducts(products, purchases) }
        {
          (!session && products.products.meta.pagination.total >= pagination+10 && products.status === 'succeeded') && 
            <MoreButton arrowMore={arrowMore} handlePagination={handlePagination} />
        }
        {
          (session && products.products.meta.pagination.total >= pagination+10 && products.status === 'succeeded' && purchases.status === 'succeeded' && purchases.currency.purchases !== 'N/A') && 
            <MoreButton arrowMore={arrowMore} handlePagination={handlePagination} />
        }
      </div>
      </div>
  )
}
