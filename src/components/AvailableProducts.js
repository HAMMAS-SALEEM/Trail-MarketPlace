import React, { useEffect } from 'react';
import { SingleItem } from './SingleItem';
import { fetchProducts } from '../store/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const AvailableProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products);

  useEffect(() => {
    if(products.status === 'idle'){
      dispatch(fetchProducts());
    }
  }, [dispatch, products.status])

    if(products.status === 'loading') return <div>Loading...</div>;

    if(products.status === 'failed') return <div>Some Problems Occuring</div>;

    return (
    <div className="items-container">
    {
      products.status === 'succeeded' && products.products.data.map((item) => (
        <SingleItem
          key={item.id}
          name={item.attributes.name}
          price={item.attributes.cost}
          img={item.attributes.image}
          desc={item.attributes.description}
          active={true}
        />
      ))
    }
    </div>
  )
}
