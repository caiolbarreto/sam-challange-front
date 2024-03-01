import { api } from '@/lib/axios'

export interface Snack {
  id: string
  name: string
  description: string
  price: number
}

export interface OrderSnacks {
  id: string
  orderId: string
  snackId: string
  quantity: number
  snack: Snack
}

export interface OrderDetails {
  orderId: string
  date: Date
  orderSnacks: OrderSnacks[]
}

export interface OrdersResponse {
  data: OrderDetails[]
  meta: {
    pageIndex: number
    totalCount: number
    perPage: number
  }
}

export async function getOrders(
  page?: number,
  pageSize?: number,
  startDate?: Date,
  endDate?: Date,
) {
  const response = await api.get<OrdersResponse>('/orders', {
    params: {
      page,
      pageSize,
      startDate,
      endDate,
    },
  })

  return response.data
}
