import { useEffect } from 'react'
import SpecialProductOne from './SpecialProductOne'
import SpecialProductTwo from './SpecialProductTwo'
import SpecialProductThree from './SpecialProductThree'

import Error from './Error'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { getAllProducts } from '../features/product/productSlice'

const SpecialProductSection = () => {
  // useEffect(() => {
  //   dispatch(getAllProducts())
  // }, [])

  // if (loading) {
  //   return <Loading />
  // }
  // if (error) {
  //   return <Error />
  // }

  return (
    <>
      {/* <SpecialProductOne /> */}
      <SpecialProductTwo />
      <SpecialProductThree />
    </>
  )
}

export default SpecialProductSection
