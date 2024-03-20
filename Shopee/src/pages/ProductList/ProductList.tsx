import { useQuery, keepPreviousData } from '@tanstack/react-query'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Paginate'
import ProductFilter from 'src/components/ProductFilter'
import Products from 'src/components/Products'
import SortProduct from 'src/components/SortProduct'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })
  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategoryList()
  })
  return (
    <div className='flex bg-slate-50 border-b-4 pb-24 border-shopee '>
      {categoryData && <ProductFilter categories={categoryData.data.data} queryConfig={queryConfig} />}
      {productsData && (
        <div className='basis-5/6'>
          <SortProduct queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
          <Products products={productsData.data.data.products} />
          <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
        </div>
      )}
    </div>
  )
}
