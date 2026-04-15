import React from 'react'
import RecentProducts from '../RecentProducts/RecentProducts'
import SliderCategories from '../SliderCategories/SliderCategories'

export default function Home() {
  return (
    <>
    <div className='my-5'>
      <SliderCategories/>
      <RecentProducts/>
    </div>
    </>
  )
}
