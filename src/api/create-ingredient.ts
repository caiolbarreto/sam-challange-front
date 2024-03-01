import { api } from '@/lib/axios'

interface CreateIngredientBody {
  name: string
  quantity: number
}

export async function createIngredient({
  name,
  quantity,
}: CreateIngredientBody) {
  await api.post('/ingredients', {
    name,
    quantity,
  })
}
