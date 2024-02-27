import { ChefHat, ShoppingCart } from 'lucide-react'

import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
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
        <ShoppingCart className="h-5 w-5" />
        <ThemeToggle />
      </div>
    </div>
  )
}
