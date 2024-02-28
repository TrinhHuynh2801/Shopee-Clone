import { useRoutes } from 'react-router-dom'
import ProductLIst from './pages/ProductLIst'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProductLIst />
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])
  return routeElements
}
