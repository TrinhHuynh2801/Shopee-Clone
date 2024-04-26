import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { logout } from 'src/apis/auth.api'
import { purchasesStatus } from 'src/constants/purchaseStatus'
import { AppContext } from 'src/contexts/app.context'
import Popover from '../Popover'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { getAvatarUrl } from 'src/utils/utils'

export default function NavHeader() {
  const { setIsAuth, isAuth, profile, setProfile } = useContext(AppContext)
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuth(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
      // navigate('/login')
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='flex flex-row justify-start sm:justify-end gap-1 items-center pr-20 m-2'>
      <Popover
        className='flex relative  items-center hover:text-gray-200 cursor-pointer '
        renderPopover={
          <div className='z-50 rounded-sm border border-gray-200 bg-white shadow-md '>
            <div className='flex flex-col py-2 pr-28 pl-3 '>
              <button className='py-2 px-3 text-left hover:text-orange-500 '>Tiếng Việt</button>
              <button className='mt-2 py-2 px-3 text-left hover:text-orange-500'>English</button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <div className='mx-1'>Tiếng Việt</div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>

      {isAuth ? (
        <Popover
          className='mx-5 cursor-pointer flex items-center hover:text-gray-200'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to={path.profile}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Tài khoản của tôi
              </Link>
              <Link
                to={path.home}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <img src={getAvatarUrl(profile?.avatar)} alt='' className='rounded-full object-contain w-6 h-6 ' />
          <div className='mx-2'>{profile?.email}</div>
        </Popover>
      ) : (
        <div className='flex items-center  '>
          <div className='border-r-2 border-[hsla(0,0%,100%,.4)]'>
            <Link to={path.register} className='cursor-pointer p-2 hover:text-gray-200'>
              Đăng ký
            </Link>
          </div>

          <Link to={path.login} className='cursor-pointer p-2 hover:text-gray-200'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
