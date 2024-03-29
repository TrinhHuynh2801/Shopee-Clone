import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import useQueryConfig from './useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'

export default function useSearchProducts() {
  const queryConfig = useQueryConfig()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: ''
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
      pathname: '',
      search: createSearchParams(config).toString()
    })
  })
  return { onSubmitSearch, register }
}
