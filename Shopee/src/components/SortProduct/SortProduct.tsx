import { Link } from 'react-router-dom'

export default function SortProduct() {
  const isActive = false
  const orderConstant = {
    asc: 'asc',
    desc: 'desc'
  } as const

  const page = 1,
    pageSize = 9
  return (
    <div className='flex flex-wrap bg-slate-200 items-center justify-between'>
      <div className='flex  gap-4 p-3 items-center'>
        <div className=''>Sắp xếp theo</div>
        <div className={`capitalize p-2 ${isActive ? 'bg-shopee text-white' : 'bg-white'} cursor-pointer`}>
          Phổ biến
        </div>
        <div className={`capitalize p-2 ${isActive ? 'bg-shopee text-white' : 'bg-white'} cursor-pointer`}>
          mới nhất
        </div>
        <div className={`capitalize p-2 ${isActive ? 'bg-shopee text-white' : 'bg-white'} cursor-pointer`}>
          bán chạy
        </div>
        <select
          className={`capitalize p-2  cursor-pointer outline-none flex-wrap`}
          // value={''}
        >
          <option selected value='' disabled className='bg-white text-black'>
            Giá
          </option>
          <option value={orderConstant.asc} className='bg-white text-black '>
            Giá: Thấp đến cao
          </option>
          <option value={orderConstant.desc} className='bg-white text-black'>
            Giá: Cao đến thấp
          </option>
        </select>
      </div>
      <div className='flex items-center mx-5'>
        <div className='mr-3'>
          <span className='text-shopeeText '>{page}</span>
          <span>/{pageSize}</span>
        </div>
        <div className='ml-2 flex gap-1'>
          {page === 1 ? (
            <span className='flex h-9 w-10 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </span>
          ) : (
            <Link
              to=''
              className='flex h-9 w-10   items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </Link>
          )}
          {page === pageSize ? (
            <span className='flex h-9 w-10  cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </span>
          ) : (
            <Link
              to=''
              className='flex h-9 w-10   items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
