import { useQuery } from '@tanstack/react-query'
import purchaseApi from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchaseStatus'

export default function Cart() {
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = purchasesInCartData?.data.data
  return (
    <div className='bg-neutral-100 py-5'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input type='checkbox' className='h-5 w-5 accent-shopee' />
                  </div>
                  <div className='flex-grow text-black'>sản phẩm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
