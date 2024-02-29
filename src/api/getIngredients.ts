import { api } from '@/lib/axios'

export interface Ingredient {
  id: string
  name: string
  quantity: number
}

export interface IngredientsResponse {
  data: Ingredient[]
  meta: {
    pageIndex: number
    totalCount: number
    perPage: number
  }
}

export async function getIngredients(page?: number, pageSize?: number) {
  const response = await api.get<IngredientsResponse>('/ingredients', {
    params: {
      page,
      pageSize,
    },
  })

  return response.data
}
