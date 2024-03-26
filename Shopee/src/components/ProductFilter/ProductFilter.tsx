import { Category } from 'src/types/category.type'
import RatingStars from '../RatingStars'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import InputNumber from '../InputNumber'
import { omit } from 'lodash'

interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}
type FormData = {
  price_min: string
  price_max: string
}
export default function ProductFilter({ categories, queryConfig }: Props) {
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    }
  })
  const errorMessage = (price_min: string, price_max: string) => {
    if (price_min !== '' && price_max !== '') {
      return Number(price_max) >= Number(price_min)
    }
    return price_min !== '' || price_max !== ''
  }
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleDelete = () => {
    navigate({
      pathname: '',
      search: createSearchParams(omit(queryConfig, ['price_max', 'price_min', 'category', 'rating_filter'])).toString()
    })
  }

  return (
    <div className='w-1/6 ml-3 mr-8'>
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
          <Link to='/'>
            {' '}
            <span className='text-base font-semibold capitalize'>Tất cả danh mục</span>
          </Link>
        </div>
        {categories.map((category) => (
          <Link
            to={{
              pathname: '',
              search: createSearchParams({
                ...queryConfig,
                category: category._id
              }).toString()
            }}
            className='my-3'
            key={category._id}
          >
            <div className='flex items-center mt-3 '>
              <svg
                viewBox='0 0 4 7'
                className={`h-2 w-2 mr-2 ${queryConfig.category === category._id ? '' : 'invisible'} fill-shopee`}
              >
                <polygon points='4 3.5 0 0 0 7' />
              </svg>
              <div className={`text-sm cursor-pointer ${queryConfig.category === category._id && 'text-shopeeText'}`}>
                {category.name}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* <div className='mb-8 pb-6 border-b-2 border-b-slate-200'>
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
      </div> */}

      <form className='mb-8  pb-6 border-b-2 border-b-slate-200' onSubmit={onSubmit}>
        <p className='mb-5'>Khoảng giá</p>
        <div className='flex items-center justify-between'>
          <Controller
            control={control}
            name='price_min'
            rules={{
              validate: (value) => errorMessage(getValues('price_min'), value) || 'Giá không phù hợp'
            }}
            render={({ field }) => {
              return (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='₫ TỪ'
                  classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                />
              )
            }}
          />

          <div className='bg-slate-400  mx-5 w-2 h-[1px]'></div>
          <Controller
            control={control}
            name='price_max'
            rules={{
              validate: (value) => errorMessage(getValues('price_min'), value) || 'Giá không phù hợp'
            }}
            render={({ field }) => {
              return (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='₫ ĐẾN'
                  classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_min')
                  }}
                />
              )
            }}
          />
        </div>
        <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>
          {errors.price_min?.message || errors.price_max?.message}
        </div>

        <button
          type='submit'
          className=' bg-shopeeText mt-5 w-full text-white p-1 uppercase hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 '
        >
          Áp dụng
        </button>
      </form>
      <RatingStars queryConfig={queryConfig} />
      <button
        onClick={handleDelete}
        className=' bg-shopeeText mt-5 w-full text-white p-1 uppercase hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 '
      >
        Xóa tất cả
      </button>
    </div>
  )
}
