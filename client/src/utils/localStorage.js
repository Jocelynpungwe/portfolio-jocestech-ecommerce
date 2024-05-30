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
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const getCartFromLocalStorage = () => {
  const result = localStorage.getItem('cart')
  const cart = result ? JSON.parse(result) : null
  return cart
}

export const removeCartFromLocalStorage = () => {
  localStorage.removeItem('cart')
}

export const addProductsToLocalStoreage = (cart) => {
  localStorage.setItem('products', JSON.stringify(cart))
}

export const getProductsFromLocalStorage = () => {
  const result = localStorage.getItem('products')
  const products = result ? JSON.parse(result) : []
  return products
}

export const removeProductsFromLocalStorage = () => {
  localStorage.removeItem('products')
}
