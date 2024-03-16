import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductLIst from './pages/ProductLIst'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
const ProtectedRoute = () => {
  const { isAuth } = useContext(AppContext)
  return isAuth ? <Outlet /> : <Navigate to='login' />
}
const RejectedRoute = () => {
  const { isAuth } = useContext(AppContext)

  return !isAuth ? <Outlet /> : <Navigate to='' />
}
export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductLIst />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'profile',
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: 'login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: 'register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
