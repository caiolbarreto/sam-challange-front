import { api } from '@/lib/axios'

interface UpdateIngredientBody {
  ingredientId: string
  name?: string
  quantity?: number
}

export async function updateIngredient({
  ingredientId,
  name,
  quantity,
}: UpdateIngredientBody) {
  await api.patch(`/ingredients/${ingredientId}`, {
    name,
    quantity,
  })
}
