import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { produce } from 'immer'
import { Fragment, useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/apis/purchase.api'
import QuantityController from 'src/components/QuantityController'
import { purchasesStatus } from 'src/constants/purchaseStatus'
import { AppContext } from 'src/contexts/app.context'
import { Purchase } from 'src/types/purchase.type'
import { formatNumberWithPeriods, generateNameId } from 'src/utils/utils'
import noproduct from 'src/assets/images/no-product.png'

function keyBy<T>(array: T[], key: keyof T): { [key: string]: T } {
  const result: { [key: string]: T } = {}
  for (const item of array) {
    result[String(item[key])] = item
  }
  return result
}

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const checkedList = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
  const checkCount = checkedList.length
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedList.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedList]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedList.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedList]
  )
  const queryClient = useQueryClient()
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  const purchasesInCart = purchasesInCartData?.data.data
  const handleCheck = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[index].checked = event.target.checked
      })
    )
  }
  const handleQuantity = (index: number, value: number, disabled: boolean) => {
    if (disabled) {
      const purchase = extendedPurchases[index]
      setExtendedPurchases(
        produce((draft) => {
          draft[index].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isCheckedAll
      }))
    )
  }
  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleDelete = (purchaseIndex: string) => {
    deletePurchaseMutation.mutate([purchaseIndex])
  }
  const handleDeleteMany = () => {
    const purchaseIndexList = checkedList.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIndexList)
  }

  const handleBuyProducts = () => {
    if (checkCount) {
      const body = checkedList.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }
  const isCheckedAll = extendedPurchases.every((purchase) => purchase.checked)

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked),
            disabled: false
          }
        }) || []
      )
    })
  }, [purchasesInCart, choosenPurchaseIdFromLocation, setExtendedPurchases])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  return (
    <div className='bg-neutral-100 py-5'>
      {extendedPurchases.length > 0 ? (
        <div className='container'>
          <div className='overflow-auto'>
            <div className='min-w-[1000px]'>
              <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                <div className='col-span-6'>
                  <div className='flex items-center'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input
                        type='checkbox'
                        className='h-5 w-5 accent-shopee'
                        checked={isCheckedAll}
                        onChange={handleCheckAll}
                      />
                    </div>
                    <div className='flex-grow text-black'>sản phẩm</div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 text-center'>
                    <div className='col-span-2'>Đơn giá</div>
                    <div className='col-span-1'>Số lượng</div>
                    <div className='col-span-1'>Số tiền</div>
                    <div className='col-span-1'>Thao tác</div>
                  </div>
                </div>
              </div>
              <div className='my-3 rounded-sm bg-white p-5 shadow'>
                {extendedPurchases.map((purchase, index) => (
                  <div
                    key={purchase._id}
                    className='mb-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-sm text-black first:mt-0'
                  >
                    <div className='col-span-6 self-center'>
                      <div className='flex'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            checked={purchase.checked}
                            className='h-5 w-5 accent-shopee'
                            onChange={handleCheck(index)}
                          />
                        </div>
                        <Link
                          className='h-20 w-20 flex-shrink-0'
                          to={`/${generateNameId({
                            name: purchase.product.name,
                            id: purchase.product._id
                          })}`}
                        >
                          <img alt={purchase.product.name} src={purchase.product.image} />
                        </Link>
                        <div className='flex-grow px-2 pt-1 pb-2'>
                          <Link
                            to={`/${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}
                            className='line-clamp-2'
                          >
                            {purchase.product.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6 self-center'>
                      <div className='grid grid-cols-5 text-center justify-center '>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='text-gray-300 line-through'>
                              ₫{formatNumberWithPeriods(purchase.product.price_before_discount)}
                            </span>
                            <span className='ml-3'>₫{formatNumberWithPeriods(purchase.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            classNameWrapper='flex items-center '
                            disabled={purchase.disabled}
                            onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                            onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                            onType={handleTypeQuantity(index)}
                            onFocusOut={(value) =>
                              handleQuantity(
                                index,
                                value,
                                value >= 1 &&
                                  value <= purchase.product.quantity &&
                                  value !== (purchasesInCart as Purchase[])[index].buy_count
                              )
                            }
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-shopeeText'>
                            ₫{formatNumberWithPeriods(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                        <div className='col-span-1'>
                          <button
                            onClick={() => handleDelete(purchase._id)}
                            className='bg-none text-black transition-colors hover:text-shopee'
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input
                  type='checkbox'
                  onChange={handleCheckAll}
                  checked={isCheckedAll}
                  className='h-5 w-5 accent-shopee'
                />
              </div>
              <button className='mx-3 border-none bg-none ' onClick={handleCheckAll}>
                Chọn tất cả ({extendedPurchases.length})
              </button>
              <button className='mx-3 border-none bg-none' onClick={handleDeleteMany}>
                Xóa
              </button>
            </div>

            <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
              <div>
                <div className='flex items-center sm:justify-end'>
                  <div>Tổng thanh toán ({checkCount} sản phẩm):</div>
                  <div className='ml-2 text-2xl text-shopeeText'>
                    ₫{formatNumberWithPeriods(totalCheckedPurchasePrice)}
                  </div>
                </div>
                <div className='flex items-center text-sm sm:justify-end'>
                  <div className='text-gray-500'>Tiết kiệm</div>
                  <div className='ml-6 text-shopeeText'>
                    ₫{formatNumberWithPeriods(totalCheckedPurchaseSavingPrice)}
                  </div>
                </div>
              </div>
              <button
                onClick={handleBuyProducts}
                disabled={buyProductsMutation.isPending}
                className='mt-5 flex h-10 w-52 items-center justify-center bg-shopee text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
              >
                Mua hàng
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className='text-center'>
            <img src={noproduct} alt='no purchase' className='mx-auto h-24 w-24' />
            <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5 text-center'>
              <Link
                to='/'
                className=' rounded-sm bg-shopee px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
              >
                Mua ngay
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}
