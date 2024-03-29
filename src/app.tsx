import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme/theme-provider'
import { Toaster } from './components/ui/sonner'
import { CartProvider } from './context/cart-context'
import { queryClient } from './lib/react-query'
import { router } from './routes'

function App() {
  return (
    <ThemeProvider storageKey="aws-burger-theme" defaultTheme="light">
      <CartProvider>
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
