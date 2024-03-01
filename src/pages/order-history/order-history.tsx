import { useMutation, useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { deleteAllOrders } from '@/api/delete-all-orders'
import { getOrders } from '@/api/get-all-orders'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'

import { DatePickerWithRange } from './order-history-date-filter'
import { OrderHistoryRow } from './order-history-row'

export function OrderHistory() {
  const [date, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const pageSize = 10

  const pageIndex = z.coerce.number().parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['orders', pageIndex, date],
    queryFn: () => getOrders(pageIndex, pageSize, date?.from, date?.to),
  })

  const { mutateAsync: deleteAllOrdersFn, isPending: isDeleting } = useMutation(
    {
      mutationFn: deleteAllOrders,
    },
  )

  const ordersWithTotal = result?.data?.map((order) => {
    const orderTotal = order.orderSnacks.reduce((total, orderSnack) => {
      return total + orderSnack.quantity * orderSnack.snack.price
    }, 0)

    return { ...order, orderTotal }
  })

  function handlePagination(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', pageIndex.toString())

      return state
    })
  }

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Order history</h1>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <h2>Filter by date range:</h2>
          <DatePickerWithRange date={date} onDateRange={setDateRange} />
        </div>
        <Button
          variant="secondary"
          onClick={() => deleteAllOrdersFn()}
          disabled={isDeleting}
        >
          Clear order history
        </Button>
      </div>
      {ordersWithTotal &&
        ordersWithTotal.map((order) => (
          <OrderHistoryRow key={order.orderId} order={order} />
        ))}
      {result && (
        <Pagination
          pageIndex={result.meta.pageIndex}
          totalCount={result.meta.totalCount}
          perPage={result.meta.perPage}
          onPageChange={handlePagination}
        />
      )}
    </>
  )
}
