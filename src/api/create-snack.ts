import { api } from '@/lib/axios'

interface IngredientDetails {
  ingredientId: string
  quantity: number
}

interface CreateSnackBody {
  name: string
  description: string
  price: number
  ingredientsDetails: IngredientDetails[]
}

export async function createSnack({
  name,
  description,
  price,
  ingredientsDetails,
}: CreateSnackBody) {
  await api.post('/snacks', {
    name,
    description,
    price,
    ingredientsDetails,
  })
}
