import GridView from './GridView'

import { useSelector } from 'react-redux'

const RecommendedProducts = () => {
  const { recommanded_products } = useSelector((store) => store.products)

  return <GridView products={recommanded_products} />
}

export default RecommendedProducts
