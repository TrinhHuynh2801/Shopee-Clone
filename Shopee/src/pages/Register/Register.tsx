import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerAccount } from 'src/apis/auth.api'
import { ErrorResponse } from 'src/types/utils.type'
import { isAxiosError422 } from 'src/utils/utils'
import { rules } from 'src/utils/validateRules'
interface FormData {
  email: string
  password: string
  confirm_password: string
}
export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    }
  })
  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...body } = data
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        reset()
      },
      onError: (error) => {
        if (isAxiosError422<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
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
    <div className='bg-shopee'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-row px-3 py-10 md:py-20 md:px-10'>
          {/* <div className='lg:basis-3/5 hidden lg:grid '>
            <div className='place-self-center'></div>
          </div> */}
          {/* <div className='lg:basis-2/5 basis-full'> */}
          <div className='basis-full'>
            <form className='bg-slate-50 rounded shadow-sm p-10' onSubmit={onSubmit} noValidate>
              <div className='text-xl'>Đăng ký</div>
              <div className='mt-8'>
                <input
                  type='email'
                  {...register('email', rules.email)}
                  placeholder='Email'
                  className='w-full p-3 outline-none border rounded border-gray-300 focus:border-gray-500 shadow-sm'
                />
                <div className='text-red-600 mt-2 text-sm min-h-5'>{errors.email?.message}</div>
              </div>
              <div className='mt-4'>
                <input
                  type='password'
                  {...register('password', rules.password)}
                  placeholder='Mật khẩu'
                  className='w-full p-3 outline-none border rounded border-gray-300 focus:border-gray-500 shadow-sm'
                />
                <div className='text-red-600 mt-2 text-sm min-h-5'>{errors.password?.message}</div>
              </div>
              <div className='mt-4'>
                <input
                  type='password'
                  {...register('confirm_password', {
                    ...rules.confirm_password,
                    validate: (value) => value === getValues('password') || 'Mật khẩu không trùng khớp'
                  })}
                  placeholder='Nhập lại mật khẩu'
                  className='w-full p-3 outline-none border rounded border-gray-300 focus:border-gray-500 shadow-sm'
                />
                <div className='text-red-600 mt-2 text-sm min-h-5'>{errors.confirm_password?.message}</div>
              </div>
              <div className='mt-6'>
                <button
                  disabled={registerMutation.isPending}
                  className='bg-shopeeText w-full text-white p-2 uppercase hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 '
                >
                  Đăng ký
                </button>
              </div>
              <div className='mt-4'>
                <div className='flex'>
                  <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                  <Link className='text-orange-500 ml-1' to='/login'>
                    Đăng nhập
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
