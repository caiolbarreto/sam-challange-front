import { api } from '@/lib/axios'

export interface SnackIngredients {
  snackId: string
  ingredientId: string
  quantity: number
}

export interface SnackDetails {
  snackId: string
  name: string
  description: string
  price: number
  snackIngredients: SnackIngredients[]
}

export interface SnacksResponse {
  data: SnackDetails[]
  meta: {
    pageIndex: number
    totalCount: number
    perPage: number
  }
}

export async function getSnacks(page?: number, pageSize?: number) {
  const response = await api.get<SnacksResponse>('/snacks', {
    params: {
      page,
      pageSize,
    },
  })

  return response.data
}
