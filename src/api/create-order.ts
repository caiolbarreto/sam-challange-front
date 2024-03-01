import { api } from '@/lib/axios'

interface SnackDetails {
  snackId: string
  quantity: number
}

interface CreateOrderBody {
  snacksDetails: SnackDetails[]
}

export async function createOrder({ snacksDetails }: CreateOrderBody) {
  await api.post('/orders', {
    snacksDetails,
  })
}
