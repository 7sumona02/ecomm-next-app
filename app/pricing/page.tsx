'use client'
import axios from 'axios'
import {useState, useEffect} from 'react'
import PricingCard from '../components/PricingCard';

const Page = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
  },[])

  const fetchPrices = async () => {
    const {data} = await axios.get('api/getproducts')
    setPrices(data);
    console.log(data);
  }
  return (
    <div className='w-screen h-full flex flex-col justify-center items-center'>
      <div className='text-center space-y-6 mt-10'>
        <h1 className='font-bold text-amber-500 text-4xl'>Pricing</h1>
        <p className='text-2xl font-semibold'>Choose the right dumpster for you!</p>
        <p className='text-neutral-500'>Checkout all the information below</p>
      </div>
      <div className='mt-20'>
        {prices && prices.map((price) => (
          <PricingCard price={price} key={price.id} />
        ))}
      </div>
    </div>
  )
}

export default Page