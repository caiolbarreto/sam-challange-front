import { createContext, ReactNode, useContext, useState } from 'react'

interface CartItem {
  id: string
  name: string
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  handleCartAddItem: (item: CartItem) => void
  handleCartRemoveItem: (itemId: string) => void
}

export const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function handleCartAddItem(item: CartItem) {
    setCartItems((prevState) => [...prevState, item])
  }

  function handleCartRemoveItem(itemId: string) {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleCartAddItem,
        handleCartRemoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
