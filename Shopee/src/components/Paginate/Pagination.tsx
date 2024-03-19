interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

export default function Pagination({ page, pageSize, setPage }: Props) {
  const RANGE = 2
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
        if (page <= RANGE * 2 - 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) return renderDotBefore(index)
          else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) return renderDotAfter(index)
        } else if (page >= pageSize - RANGE * 2 && pageNumber < page - RANGE && pageNumber > RANGE) {
          return renderDotBefore(index)
        }
        return (
          <button
            key={index}
            className={`bg-white px-3 py-2 shadow-sm mx-2 cursor-pointer hover:text-shopeeText ${page === pageNumber && 'text-red-600 hover:text-yellow-300 bg-black'}`}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }
  return (
    <div className='flex justify-center flex-wrap mt-6'>
      <button className='bg-white px-3 py-2 shadow-sm mx-2 cursor-pointer'>Prev</button>
      {renderPagination()}
      <button className='bg-white px-3 py-2 shadow-sm mx-2 cursor-pointer'>Next</button>
    </div>
  )
}
