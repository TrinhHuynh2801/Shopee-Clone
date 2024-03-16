import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginAccount } from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { isAxiosError422 } from 'src/utils/utils'
import { rules } from 'src/utils/validateRules'

interface FormData {
  email: string
  password: string
}
export default function Login() {
  const { setIsAuth } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>()
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        setIsAuth(true)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosError422<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange-500'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-row px-3 py-10 md:py-20 md:px-10'>
          <div className='lg:basis-3/5'></div>
          <div className='lg:basis-2/5 basis-full'>
            <form className='bg-slate-50 rounded shadow-sm p-10' onSubmit={onSubmit} noValidate>
              <div className='text-xl'>Đăng nhập</div>
              <div className='mt-8'>
                <input
                  type='email'
                  placeholder='Email'
                  {...register('email', rules.email)}
                  className='w-full p-3 outline-none border rounded border-gray-300 focus:border-gray-500 shadow-sm'
                />
                <div className='text-red-600 mt-2 text-sm min-h-5'>{errors.email?.message}</div>
              </div>
              <div className='mt-4'>
                <input
                  type='password'
                  placeholder='Mật khẩu'
                  {...register('password', rules.password)}
                  className='w-full p-3 outline-none border rounded border-gray-300 focus:border-gray-500 shadow-sm'
                />
                <div className='text-red-600 mt-2 text-sm min-h-5'>{errors.password?.message}</div>
              </div>

              <div className='mt-4'>
                <button type='submit' className='bg-orange-500 w-full text-white p-2 uppercase hover:bg-orange-600'>
                  Đăng nhập
                </button>
              </div>
              <div className='mt-4'>
                <div className='flex'>
                  <span className='text-slate-400'>Bạn chưa có tài khoản?</span>
                  <Link className='text-orange-500 ml-1' to='/register'>
                    Đăng ký
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
