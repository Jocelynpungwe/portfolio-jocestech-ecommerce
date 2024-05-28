import React from 'react'
import styled from 'styled-components'

const ProductBox = ({ image = [[]] }) => {
  return (
    <Wrapper>
      <div className="product-image-container">
        <div>
          <img
            src={image[1]}
            className="smaller-img"
            alt="featured images one"
          />
          <img
            src={image[2]}
            className="smaller-img"
            alt="featured images two"
          />
        </div>
        <img src={image[3]} className="large-img" alt="featured images three" />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 50px 0px;
  h6 {
    color: #000;
    font-family: Manrope;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px; /* 150% */
    letter-spacing: 0.857px;
    text-transform: uppercase;
    margin: 20px 0;
  }
  .smaller-img {
    height: 200px;
    object-fit: cover;
  }
  .large-img {
    height: 407px;
    object-fit: cover;
  }
`

export default ProductBox
