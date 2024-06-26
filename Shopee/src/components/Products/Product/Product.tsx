import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { formatNumberToK, formatNumberWithPeriods, generateNameId } from 'src/utils/utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`/${generateNameId({ name: product.name, id: product._id })}`} className='mt-2 w-1/2 md:w-1/4 lg:w-1/5 '>
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
    </Link>
  )
}
