import { Link, createSearchParams } from 'react-router-dom'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function Pagination({ queryConfig, pageSize }: Props) {
  const RANGE = 2
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button key={index} className='bg-white px-3 py-2 shadow-sm mx-2' disabled>
            ...
          </button>
        )
      } else return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button key={index} className='bg-white px-3 py-2 shadow-sm mx-2' disabled>
            ...
          </button>
        )
      } else return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) return renderDotBefore(index)
          else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) return renderDotAfter(index)
        } else if (page >= pageSize - RANGE * 2 && pageNumber < page - RANGE && pageNumber > RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: '/',
              search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
            }}
            key={index}
            className={`px-3 py-2 shadow-sm mx-2 cursor-pointer hover:text-shopeeText ${page === pageNumber ? 'text-white hover:text-white bg-orange-500' : 'bg-white'}`}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-6 flex justify-center flex-wrap '>
      {page === 1 ? (
        <span className='sm:mx-2 cursor-not-allowed rounded border opacity-50 bg-white/60 px-3 py-2  shadow-sm'>
          Prev
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
          className='sm:mx-2 cursor-pointer rounded border bg-white px-3 py-2  shadow-sm'
        >
          Prev
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className='sm:mx-2 cursor-not-allowed rounded border opacity-50 bg-white/60 px-3 py-2  shadow-sm'>
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='sm:mx-2 cursor-pointer rounded border bg-white px-3 py-2  shadow-sm'
        >
          Next
        </Link>
      )}
    </div>
  )
}
