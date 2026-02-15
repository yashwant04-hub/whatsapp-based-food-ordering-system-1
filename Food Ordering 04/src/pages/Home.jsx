import React from 'react'
import Hero from '../components/Hero'
import TopSelling from '../components/TopSelling'
import Reviews from '../components/Reviews'
import Better from '../components/Better'

const Home = () => {
  return (
    <div>
        <Hero/>
        <TopSelling/>
        <Reviews/>
        <Better/>
    </div>
  )
}

export default Home