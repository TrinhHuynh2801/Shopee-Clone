import Product from './Product'
import { Product as ProductType } from 'src/types/product.type'
interface Props {
  products: ProductType[]
}
export default function Products({ products }: Props) {
  return (
    <div className='flex flex-wrap  '>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  )
}
