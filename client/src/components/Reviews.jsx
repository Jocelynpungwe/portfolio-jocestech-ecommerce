import { useState, useEffect } from 'react'
import { BsStarFill } from 'react-icons/bs'
import Stars from './Stars'
import { useSelector } from 'react-redux'
const Reviews = ({ reviews, groupRating = [], averageRating }) => {
  const [totalGroupRating, setTotalGroupRating] = useState(0)
  const { user } = useSelector((store) => store.user)

  useEffect(() => {
    if (groupRating.length > 0)
      setTotalGroupRating(
        groupRating.reduce((prev, curr) => {
          return prev + curr.groupRating
        }, 0)
      )
  }, [groupRating])

  console.log(user)

  return (
    <div>
      <h2>Your reviews</h2>
      <h3>
        {averageRating} <BsStarFill /> overall rating
      </h3>
      {groupRating.length > 0 &&
        groupRating
          .slice()
          .sort((a, b) => {
            return a?._id + b?._id
          })
          .map((rating) => {
            return (
              <div key={rating._id}>
                <h4>{rating._id} starts</h4>
                <div
                  style={{
                    backgroundColor: 'red',
                    height: '40px',
                    width: '80%',
                  }}
                >
                  <div
                    style={{
                      width: `${Math.ceil(
                        (rating.groupRating / totalGroupRating) * 100
                      )}%`,
                      backgroundColor: 'blue',
                      height: '40px',
                    }}
                  ></div>
                </div>
                <h5>
                  {Math.ceil((rating.groupRating / totalGroupRating) * 100)}%
                </h5>
              </div>
            )
          })}
      {reviews.map((review) => {
        return (
          <div key={review._id}>
            <div className="review">
              <Stars averageRating={review.rating} />
              <div className="info">
                <p className="name">{review.user.name}</p>
                <p className="title">{review.title}</p>
                <p className="date">{review.createdAt}</p>
              </div>
              <p>{review.comment}</p>
            </div>
            {review.user._id === user.userId && (
              <div>
                <button
                  type="button"
                  onClick={() =>
                    console.log('edit review with id:', review._id)
                  }
                >
                  Edit review
                </button>
                <button
                  type="button"
                  onClick={() =>
                    console.log('delete review with id:', review._id)
                  }
                >
                  Delete review
                </button>
              </div>
            )}
            <hr />
          </div>
        )
      })}
    </div>
  )
}

export default Reviews
