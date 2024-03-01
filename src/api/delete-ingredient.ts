import { api } from '@/lib/axios'

interface DeleteIngredientParams {
  ingredientId: string
}

export async function deleteIngredient({
  ingredientId,
}: DeleteIngredientParams) {
  await api.delete(`/ingredients/${ingredientId}`)
}
