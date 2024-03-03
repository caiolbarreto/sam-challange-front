import { ChefHat, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

import { useCart } from '@/context/cart-context'

import { Cart } from './cart'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  const { cartItems } = useCart()
  const [openSheet, setOpenSheet] = useState(false)

  function handleOpenSheet() {
    setOpenSheet(!openSheet)
  }

  return (
    <>
      <Cart open={openSheet} handleOpen={handleOpenSheet} />
      <div className="flex h-16 w-full items-center justify-between px-3">
        <div className="flex items-center gap-4">
          <ChefHat className="h-7 w-7" />
          <Separator orientation="vertical" className="h-6" />
          <nav className="flex space-x-4">
            <NavLink to="/">Catalog</NavLink>
            <NavLink to="/orders">Orders</NavLink>
            <NavLink to="/snacks">Snacks</NavLink>
            <NavLink to="/ingredients">Ingredients</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <div className="relative p-3">
            <ShoppingCart
              className="h-5 w-5 cursor-pointer"
              onClick={handleOpenSheet}
            />
            {cartItems.length > 0 && (
              <div className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                <p className="text-xs">{cartItems.length}</p>
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
