import { Purchase, PurchaseListStatus } from 'src/types/purchase'
import { Response } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<Response<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<Response<Purchase[]>>(`${URL}`, {
      params
    })
  }
}

export default purchaseApi
