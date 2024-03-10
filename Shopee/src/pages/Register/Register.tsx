import { Link } from 'react-router-dom'
export default function Register() {
  return (
    <div className='bg-orange-500'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-row md:py-20 md:px-10'>
          <div className='md:basis-3/5'></div>
          <div className='md:basis-2/5 basis-full'>
            <form className='bg-slate-50 rounded shadow-sm p-10'>
              <div className='text-xl'>Đăng ký</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  className='w-full p-3 outline-none border rounded border-gray-300 focus:border-gray-500 shadow-sm'
                />
                <div className='text-red-600 mt-2 text-sm'>Email không hợp lệ</div>
              </div>
              <div className='mt-4'>
                <input
                  type='password'
                  name='password'
                  placeholder='Mật khẩu'
                  className='w-full p-3 outline-none border rounded border-gray-300 focus:border-gray-500 shadow-sm'
                />
                <div className='text-red-600 mt-2 text-sm'>Mật khẩu không hợp lệ</div>
              </div>
              <div className='mt-4'>
                <input
                  type='password'
                  name='confirm_password'
                  placeholder='Nhập lại mật khẩu'
                  className='w-full p-3 outline-none border rounded border-gray-300 focus:border-gray-500 shadow-sm'
                />
                <div className='text-red-600 mt-2 text-sm'>Mật khẩu không trùng khớp</div>
              </div>
              <div className='mt-6'>
                <button className='bg-red-500 w-full text-white p-2 uppercase hover:bg-red-600'>Đăng ký</button>
              </div>
              <div className='mt-2'>
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
