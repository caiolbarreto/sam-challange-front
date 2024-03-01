import { OrderSnacks } from '@/api/get-all-orders'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface OrderDetailsProps {
  open: boolean
  handleOpenModal: () => void
  order: {
    orderTotal: number
    orderId: string
    date: Date
    orderSnacks: OrderSnacks[]
  }
}

export function OrderDetails({
  open,
  handleOpenModal,
  order,
}: OrderDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={handleOpenModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Order: <span className="text-sm font-medium">{order.orderId}</span>
          </DialogTitle>
          <DialogDescription className="mt-2">Order Details</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">Product</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderSnacks.map((orderSnack) => {
                return (
                  <TableRow key={orderSnack.id}>
                    <TableCell>{orderSnack.snack.name}</TableCell>
                    <TableCell className="text-right">
                      {orderSnack.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {(orderSnack.snack.price / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {(
                        (orderSnack.snack.price * orderSnack.quantity) /
                        100
                      ).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Order total</TableCell>
                <TableCell className="text-right font-medium">
                  {(order.orderTotal / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
