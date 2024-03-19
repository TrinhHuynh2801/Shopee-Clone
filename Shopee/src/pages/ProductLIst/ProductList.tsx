import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Paginate'
import ProductFilter from 'src/components/ProductFilter'
import Products from 'src/components/Products'
import SortProduct from 'src/components/SortProduct'
import useQueryParams from 'src/hooks/useQueryParams'

export default function ProductLIst() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })

  console.log(data)
  return (
    <div className='pt-36 flex bg-slate-50 border-b-4 pb-24 border-shopee '>
      <ProductFilter />
      <div className='basis-5/6'>
        <SortProduct />
        {data && <Products products={data.data.data.products} />}
        <Pagination />
      </div>
    </div>
  )
}
