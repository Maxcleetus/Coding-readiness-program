import React from 'react'
import Hero from '../components/Hero'
import LeaderBoard from '../components/LeaderBoard'
import WinnerSpotlight from '../components/WinnerSpotlight'
const Home = () => {
  return (
    <div>
        <Hero/>
        <WinnerSpotlight/>
        <LeaderBoard/>
    </div>
  )
}

export default Home
