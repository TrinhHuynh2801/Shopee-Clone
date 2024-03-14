import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerAccount } from 'src/apis/auth.api'
import { Response } from 'src/types/utils.type'
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
    formState: { errors }
  } = useForm<FormData>()
  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...body } = data
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        toast.success(data.data.message)
      },
      onError: (error) => {
        if (isAxiosError422<Response<Omit<FormData, 'confirm_password'>>>(error)) {
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
        <div className='flex flex-row md:py-20 md:px-10'>
          <div className='md:basis-3/5'></div>
          <div className='md:basis-2/5 basis-full'>
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
                <button className='bg-red-500 w-full text-white p-2 uppercase hover:bg-red-600'>Đăng ký</button>
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
