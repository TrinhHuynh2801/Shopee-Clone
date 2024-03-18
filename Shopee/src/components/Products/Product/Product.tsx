export default function Product() {
  return (
    <div className='mt-2 basis-1/3 md:basis-1/5 '>
      <div className='bg-white  m-2 shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          {/* <img
        src={product.image}
        alt={product.name}
        className='absolute top-0 left-0 h-full w-full bg-white object-cover'
      /> */}
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>Product name</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>5000</span>
            </div>
            <div className='ml-1 truncate text-shopeeText'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>4000</span>
            </div>
          </div>
        </div>
        <div className='mt-3 flex items-center'>
          <div className='ml-2 text-sm'>
            <span className='ml-1'>Đã bán </span>

            <span>2,6K</span>
          </div>
        </div>
      </div>
    </div>
  )
}
