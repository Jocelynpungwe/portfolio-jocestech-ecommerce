import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateOrder } from '../features/order/orderSlice'
const PaymentSuccessfullPage = () => {
  const dispatch = useDispatch()
  const { order, address } = useSelector((store) => store.order)
  console.log('payment sucessfull', order)
  console.log('address successfull', address)
  useEffect(() => {
    dispatch(updateOrder({ order, address }))
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <div>PaymentSuccessfullPage</div>
}

export default PaymentSuccessfullPage
