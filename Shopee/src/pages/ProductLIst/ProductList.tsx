import { useQuery, keepPreviousData } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Paginate'
import ProductFilter from 'src/components/ProductFilter'
import Products from 'src/components/Products'
import SortProduct from 'src/components/SortProduct'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })

  return (
    <div className='flex bg-slate-50 border-b-4 pb-24 border-shopee '>
      <ProductFilter />
      {data && (
        <div className='basis-5/6'>
          <SortProduct queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
          <Products products={data.data.data.products} />
          <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
        </div>
      )}
    </div>
  )
}
