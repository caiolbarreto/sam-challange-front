import { format } from 'date-fns'
import { useState } from 'react'

import { OrderSnacks } from '@/api/get-all-orders'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { OrderDetails } from './order-details'

interface OrderHistoryRowProps {
  order: {
    orderTotal: number
    orderId: string
    date: Date
    orderSnacks: OrderSnacks[]
  }
}

export function OrderHistoryRow({ order }: OrderHistoryRowProps) {
  const [openDialog, setOpenDialog] = useState(false)

  function handleOpenDialog() {
    setOpenDialog(!openDialog)
  }

  return (
    <>
      <OrderDetails
        open={openDialog}
        handleOpenModal={handleOpenDialog}
        order={order}
      />
      <div
        key={order.orderId}
        className="border-1 flex items-center justify-between rounded-md border p-5"
      >
        <div>
          <h2 className="font-bold">Items:</h2>
          {order.orderSnacks.slice(0, 2).map((orderSnack, index) => (
            <p
              key={index}
              className="flex items-center gap-1 text-muted-foreground"
            >
              <span className="rounded-md bg-primary/80 px-1 py-0.5 text-xs text-background">
                {orderSnack.quantity}
              </span>
              {orderSnack.snack.name}
            </p>
          ))}
          {order.orderSnacks.length > 2 && (
            <p className="text-muted-foreground">
              and {order.orderSnacks.length - 2} more items
            </p>
          )}
        </div>
        <div className="flex items-center gap-10">
          <Badge className="gap-1 py-1" variant="secondary">
            <span>Order total:</span>
            <p className="font-medium text-muted-foreground">
              {(order.orderTotal / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </Badge>
          <Badge className="gap-1 py-1" variant="secondary">
            <span>Ordered at:</span>
            <p className="font-medium text-muted-foreground">
              {format(new Date(order.date), 'MM/dd/yyyy')}
            </p>
          </Badge>
          <Button onClick={handleOpenDialog}>View details</Button>
        </div>
      </div>
    </>
  )
}
