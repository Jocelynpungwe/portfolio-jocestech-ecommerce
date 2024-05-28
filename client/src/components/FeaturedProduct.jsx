import { useEffect } from 'react'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'

import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../features/product/productSlice'

const FeaturedProduct = () => {
  const {
    products_loading: loading,
    products_error: error,
    featured_products: featured,
  } = useSelector((store) => store.products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  return (
    <Wrapper className="section">
      <div className="section-center featured">
        {featured.slice(0, 3).map((product) => {
          return <Product key={product.id} {...product} />
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 165px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 768px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
  }
`

export default FeaturedProduct
