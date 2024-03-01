import { api } from '@/lib/axios'

export async function deleteAllOrders() {
  await api.delete('/orders')
}
