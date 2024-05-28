import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Error from './Error'
import Loading from './Loading'

const SpecialProductTwo = () => {
  const {
    products_loading: loading,
    products_error: error,
    products,
  } = useSelector((store) => store.products)

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  return (
    <Wrapper className="section-center">
      <div className="homepage-product-zx7-speaker">
        {products.length > 0 &&
          products
            .filter((product) => product.name === 'iPhone X')
            .map((product) => {
              return (
                <div className="homepage-product-zx7-speaker-container">
                  <h2>{product.name}</h2>
                  <Link
                    class="btn secondary-btn"
                    to={`products/${product.id}`}
                    key={product.name}
                  >
                    see product
                  </Link>
                </div>
              )
            })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-bottom: 60px;
  .homepage-product-zx7-speaker {
    display: flex;
    align-items: center;
    /* background: gray;
    background-image: url({specialImge}); */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 90% center;
    height: 367px;
    margin-top: 25px;
    padding-left: 20px;
  }

  h2 {
    color: #000;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }
  .btn-secondary {
    color: #000000;
    border: 1px solid #000;
    margin-top: 24px;
  }
  .homepage-product-zx7-speaker-container {
    margin-left: 35px;
  }
  @media (min-width: 768px) {
    .homepage-product-zx7-speaker-container {
      margin-left: 64px;
    }
  }
  @media (min-width: 1020px) {
    .homepage-product-zx7-speaker-container {
      margin-left: 100px;
    }
  }
`

export default SpecialProductTwo
