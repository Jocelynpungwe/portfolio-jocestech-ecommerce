import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import { useSelector } from 'react-redux'
const ProductList = () => {
  const { products } = useSelector((store) => store.products)
  const [grid_view, setGridView] = React.useState(false)
  console.log('product page', products)
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    )
  }

  if (grid_view === false) {
    return <ListView products={products} />
  }
  return <GridView products={products} />
}

export default ProductList
