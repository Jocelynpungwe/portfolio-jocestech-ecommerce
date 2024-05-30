import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Stars from './Stars'
const AddReview = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user)
  const [editing, setEditing] = useState(false)
  return (
    <Wrapper>
      {user ? (
        <button className="btn" onClick={() => setEditing(!editing)}>
          Add Review
        </button>
      ) : (
        <Link className="btn" to="/register">
          Login To Add Review
        </Link>
      )}
      {editing && (
        <form>
          <Stars />
          <input type="text" placeholder="title" name="title" value="title" />
          <textarea placeholder="comment" name="comment" value="comment" />
          <button className="secondary-btn">Submit</button>
        </form>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.section`
  padding-top: 1rem;
`
export default AddReview
