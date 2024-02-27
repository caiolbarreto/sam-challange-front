import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { Home } from './pages/home/home'
import { OrderHistory } from './pages/order-history/order-history'
import { Snacks } from './pages/snacks/snack-table'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/orders', element: <OrderHistory /> },
      { path: '/snacks', element: <Snacks /> },
    ],
  },
])
