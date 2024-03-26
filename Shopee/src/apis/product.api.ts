import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { Response } from 'src/types/utils.type'
import http from 'src/utils/http'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<Response<ProductList>>('products', {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<Response<Product>>(`products/${id}`)
  }
}
export default productApi
