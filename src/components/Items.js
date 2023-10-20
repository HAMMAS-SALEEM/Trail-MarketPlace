import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { SingleItem } from './SingleItem';

export const Items = () => {
  const [data, setData] = useState(null)
    const fetchData = async () => {
      const res = await axios.get('https://trailmarket.up.railway.app/api/products')
      setData(res.data.data)
    }
    useEffect(() => {
      fetchData();
    }, [])
  return (
    <div className="items-container">
    {
      data && data.map((item) => (
        <SingleItem
          key={item.id}
          name={item.attributes.name}
          price={item.attributes.cost}
          img={item.attributes.image}
          desc={item.attributes.description}
        />
      ))
    }
    </div>
  )
}
