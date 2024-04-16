import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import useQueryConfig from './useQueryConfig'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

export default function useSearchProducts() {
  const [searchParams] = useSearchParams()
  const defaultName = searchParams.get('name')
  const queryConfig = useQueryConfig()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: defaultName || ''
    }
  })
  const navigate = useNavigate()

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name.trim()
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name.trim()
        }
    navigate({
      pathname: '/',
      search: createSearchParams(config).toString()
    })
  })
  return { onSubmitSearch, register }
}
