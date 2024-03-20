import { Category } from 'src/types/category.type'
import { Response } from 'src/types/utils.type'
import http from 'src/utils/http'

const categoryApi = {
  getCategoryList() {
    return http.get<Response<Category[]>>('categories')
  }
}

export default categoryApi
