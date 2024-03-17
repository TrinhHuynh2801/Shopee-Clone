import RatingStars from '../RatingStars'

export default function ProductFilter() {
  const checker = true
  return (
    <div className='basis-1/6 ml-3 mr-8'>
      <div className='mb-8'>
        <div className='flex items-center pb-2 border-b-2 border-b-slate-200 '>
          <svg viewBox='0 0 12 10' className='h-3 w-3 mr-2'>
            <g fillRule='evenodd' stroke='none' strokeWidth={1}>
              <g transform='translate(-373 -208)'>
                <g transform='translate(155 191)'>
                  <g transform='translate(218 17)'>
                    <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                    <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                    <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <span className='text-base font-semibold capitalize'>Tất cả danh mục</span>
        </div>
        <div className='my-3'>
          <div className='flex items-center mt-3 '>
            <svg viewBox='0 0 4 7' className={`h-2 w-2 mr-2 ${checker ? '' : 'invisible'} fill-shopee`}>
              <polygon points='4 3.5 0 0 0 7' />
            </svg>
            <div className='text-sm cursor-pointer'>Đồ chơi</div>
          </div>
        </div>
      </div>

      <div className='mb-8 pb-6 border-b-2 border-b-slate-200'>
        <div className='flex items-center'>
          <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className='stroke-black w-3 h-3 mr-2'>
            <g>
              <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </g>
          </svg>
          <span className='text-base font-semibold uppercase'>Bộ lọc tìm kiếm</span>
        </div>
      </div>

      <form className='mb-8  pb-6 border-b-2 border-b-slate-200'>
        <p className='mb-5'>Khoảng giá</p>
        <div className='flex items-center justify-between'>
          <input
            type='text'
            placeholder='₫ TỪ'
            className='rounded-sm shadow-sm outline-none w-0 flex-grow shrink-0 border p-2 text-xs'
          />
          <div className='bg-slate-400  mx-5 w-2 h-[1px]'></div>
          <input
            type='text'
            placeholder='₫ ĐẾN'
            className='rounded-sm shadow-sm outline-none  w-0 flex-grow shrink-0 border p-2 text-xs'
          />
        </div>
        <button
          type='submit'
          className=' bg-shopeeText mt-5 w-full text-white p-1 uppercase hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 '
        >
          Áp dụng
        </button>
      </form>
      <RatingStars />
      <button
        type='submit'
        className=' bg-shopeeText mt-5 w-full text-white p-1 uppercase hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 '
      >
        Xóa tất cả
      </button>
    </div>
  )
}
