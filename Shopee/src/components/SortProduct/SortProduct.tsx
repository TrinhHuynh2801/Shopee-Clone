import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { order as orderConstant, sortBy } from 'src/constants/sortBy'
import { ProductListConfig } from 'src/types/product.type'
interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProduct({ queryConfig, pageSize }: Props) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)
  const navigate = useNavigate()
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '',
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortByValue
      }).toString()
    })
  }

  return (
    <div className='flex flex-wrap bg-slate-200 items-center justify-between'>
      <div className='flex  gap-4 p-3 items-center'>
        <div className=''>Sắp xếp theo</div>
        <button
          onClick={() => handleSort(sortBy.view)}
          className={`capitalize p-2 ${sort_by === sortBy.view ? 'bg-shopee text-white' : 'bg-white'} cursor-pointer`}
        >
          Phổ biến
        </button>
        <button
          onClick={() => handleSort(sortBy.createdAt)}
          className={`capitalize p-2 ${sort_by === sortBy.createdAt ? 'bg-shopee text-white' : 'bg-white'} cursor-pointer`}
        >
          mới nhất
        </button>
        <button
          onClick={() => handleSort(sortBy.sold)}
          className={`capitalize p-2 ${sort_by === sortBy.sold ? 'bg-shopee text-white' : 'bg-white'} cursor-pointer`}
        >
          bán chạy
        </button>
        <select className={`capitalize p-2  cursor-pointer outline-none flex-wrap`} value={order || ''}>
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
              to={{
                pathname: '',
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
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
              to={{
                pathname: '',
                search: createSearchParams({
                  ...queryConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
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
