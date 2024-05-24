export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
}

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user')
  const user = result ? JSON.parse(result) : null
  return user
}

export const addCartToLocalStoreage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(user))
}

export const getCartFromLocalStorage = () => {
  const result = localStorage.getItem('cart')
  const user = result ? JSON.parse(result) : null
  return user
}

export const removeCartFromLocalStorage = () => {
  localStorage.removeItem('cart')
}
