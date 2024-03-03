import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createOrder } from '@/api/create-order'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useCart } from '@/context/cart-context'

import { ItemRow } from './item-row'

interface CartProps {
  open: boolean
  handleOpen: () => void
}

export function Cart({ open, handleOpen }: CartProps) {
  const { cartItems, handleChangeQuantity } = useCart()

  const { mutateAsync: createOrderFn, isPending: isCreating } = useMutation({
    mutationFn: createOrder,
  })

  async function handleMakeOrder() {
    const orderBody = cartItems.map((order) => {
      return {
        snackId: order.id,
        quantity: order.quantity,
      }
    })

    try {
      await createOrderFn({ orderDetails: orderBody })
      toast.success('Order created successfully!')
      handleOpen()
    } catch {
      toast.error('Error when ordering the items.')
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            Remove or modify the number of items in your cart
          </SheetDescription>
          <div className="mt-16">
            {cartItems.map((item) => {
              return (
                <ItemRow
                  key={item.id}
                  name={item.name}
                  currentQuantity={item.quantity}
                  itemId={item.id}
                  handleChangeQuantity={handleChangeQuantity}
                />
              )
            })}
          </div>
        </SheetHeader>

        <SheetFooter className="mt-5">
          <Button type="submit" disabled={isCreating} onClick={handleMakeOrder}>
            Order now!
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
