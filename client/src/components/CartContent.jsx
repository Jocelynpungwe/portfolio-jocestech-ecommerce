import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import CartColumns from './CartColumns'
import CartItem from './CartItem'
import CartTotals from './CartTotals'
import { clearCart } from '../features/cart/cartSlice'

const CartContent = () => {
  const dispatch = useDispatch()

  const { cart } = useSelector((store) => store.cart)
  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />
      })}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continue shopping
        </Link>
        <button
          type="button"
          className="link-btn clear-btn"
          onClick={() => dispatch(clearCart())}
        >
          clear shopping cart
        </button>
      </div>
      <CartTotals />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--primary-chocolate);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`

export default CartContent
