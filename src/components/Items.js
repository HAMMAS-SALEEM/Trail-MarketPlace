import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { SingleItem } from './SingleItem';

export const Items = () => {
  const [data, setData] = useState(null)
    const fetchData = async () => {
      const res = await axios.get('http://localhost:1337/api/products')
      console.log(res.data.data)
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
