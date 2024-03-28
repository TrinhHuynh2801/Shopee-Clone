import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { formatNumberToK, formatNumberWithPeriods, rateSale } from 'src/utils/utils'
import { useEffect, useMemo, useState } from 'react'
import { Product } from 'src/types/product.type'

export default function ProductDetail() {
  const { id } = useParams()
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  console.log(currentIndexImages)
  const [activeImage, setActiveImage] = useState('')

  const { data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productData?.data.data
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }
  const next = () => {
    if (currentIndexImages[1] < (product as Product).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                // onMouseMove={handleZoom}
                // onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                  // ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-shopee' />}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-shopee text-shopeeText'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassname='fill-shopee text-shopeeText h-4 w-4'
                    nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToK(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>
                  ₫{formatNumberWithPeriods(product.price_before_discount)}
                </div>
                <div className='ml-3 text-3xl font-medium text-shopeeText'>
                  ₫{formatNumberWithPeriods(product.price)}
                </div>
                <div className='ml-4 rounded-sm bg-shopee px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                {/* <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                /> */}
                {/* <div className='ml-6 text-sm text-gray-500'>
                  {product.quantity} {t('product:available')}
                </div> */}
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  // onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-shopee bg-shopee/10 px-5 capitalize text-shopeeText shadow-sm hover:bg-shopee/5'
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-shopee text-shopeeText'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  // onClick={buyNow}
                  className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-shopee px-5 capitalize text-white shadow-sm outline-none hover:bg-shopee/90'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container ml-auto mr-auto pl-4 pr-4'>
          <div className=' bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-400'>CÓ THỂ BẠN CŨNG THÍCH</div>
          {/* {productsData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}
