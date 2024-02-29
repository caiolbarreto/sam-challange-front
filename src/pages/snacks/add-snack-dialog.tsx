import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createSnack } from '@/api/createSnack'
import { Ingredient } from '@/api/getIngredients'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { SelectIngredients } from './select-ingredients-box'

const createSnackSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
})

export type SelectedIngredientsSchema = Ingredient & {
  currentQuantity: number
}

type CreateSnackSchema = z.infer<typeof createSnackSchema>

export function AddSnackDialog() {
  const [price, setPrice] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState<
    SelectedIngredientsSchema[]
  >([])

  const { register, handleSubmit } = useForm<CreateSnackSchema>({
    resolver: zodResolver(createSnackSchema),
  })

  const { mutateAsync: createSnackFn, isPending: isCreating } = useMutation({
    mutationFn: createSnack,
  })

  const handleSelectIngredients = (
    ingredients: SelectedIngredientsSchema[],
  ) => {
    setSelectedIngredients(ingredients)
  }

  const formatCurrency = (value: string): string => {
    const amount = value.replace(/[^\d]/g, '')

    let formattedAmount = ''
    if (amount !== '') {
      const numberValue = parseInt(amount, 10) / 100
      formattedAmount = numberValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    }

    return formattedAmount
  }

  function priceToCents(price: string): number {
    const cleanedPrice = price.replace(/[^\d,]/g, '').replace(',', '.')

    const cents = parseFloat(cleanedPrice) * 100

    return Math.round(cents)
  }

  async function handleAddSnack(data: CreateSnackSchema) {
    try {
      const ingredientsDetails = selectedIngredients.map((ingredient) => {
        return {
          ingredientId: ingredient.id,
          quantity: ingredient.currentQuantity,
        }
      })

      const parsedPrice = priceToCents(data.price)

      await createSnackFn({
        name: data.name,
        description: data.description,
        price: parsedPrice,
        ingredientsDetails,
      })

      toast.success('Snack registered successfully!')
      setOpen(false)
    } catch {
      toast.error('Error when registering the snack.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add new snack</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add snack</DialogTitle>
          <DialogDescription>
            Fill with the new snack information
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleAddSnack)}>
          <div className="scrollbar-hide h-[550px] gap-10 overflow-y-scroll px-1">
            <div className="flex-1 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Cheese burger"
                  {...register('name')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Bun, meat, cheese..."
                  {...register('description')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={price}
                  placeholder="R$ 0,00"
                  {...register('price')}
                  onChange={(event) =>
                    setPrice(formatCurrency(event.target.value))
                  }
                />
              </div>
            </div>
            <div>
              <h2 className="my-5 font-bold">Choose your ingredients</h2>
              <SelectIngredients
                selectedIngredients={selectedIngredients}
                handleSelectIngredients={handleSelectIngredients}
              />
            </div>
          </div>
          <DialogFooter>
            <div className="mt-5 space-x-2">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={selectedIngredients.length === 0 || isCreating}
              >
                Save
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
