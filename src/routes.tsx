import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { Home } from './pages/home/home'
import { OrderHistory } from './pages/order-history/order-history'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/orders', element: <OrderHistory /> },
    ],
  },
])
