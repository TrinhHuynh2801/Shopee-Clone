import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'

interface Props {
  product: ProductType
}
function formatNumberWithPeriods(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function formatNumberToK(number: number) {
  if (number >= 1000) {
    const dividedNumber = number / 1000

    return dividedNumber.toFixed(1) + 'K'
  } else {
    // If the number is less than 1000, return it as it is
    return number.toString()
  }
}
export default function Product({ product }: Props) {
  return (
    <div className='mt-2 w-1/3 md:w-1/5 '>
      <div className='bg-white  m-2 shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        {/* <div className='relative w-full pt-[100%] '>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 h-full w-full bg-white object-cover'
          />
        </div> */}
        <div className='h-full '>
          <img src={product.image} alt={product.name} className='h-[200px] w-full ' />
        </div>

        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatNumberWithPeriods(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-shopeeText'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatNumberWithPeriods(product.price)}</span>
            </div>
          </div>
        </div>
        <div className='mt-2 pb-4 flex items-center'>
          <ProductRating rating={product.rating} />
          <div className='ml-2 text-sm'>
            <span className=''>Đã bán </span>

            <span>{formatNumberToK(product.sold)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
