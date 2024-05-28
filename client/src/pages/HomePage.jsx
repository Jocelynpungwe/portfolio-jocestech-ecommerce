import React from 'react'
import {
  FeaturedProducts,
  Hero,
  Services,
  Contact,
  SpecialProductSection,
  SmallWebDescription,
} from '../components'
const HomePage = () => {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <SpecialProductSection />
      <Services />
      <SmallWebDescription />
    </main>
  )
}

export default HomePage
