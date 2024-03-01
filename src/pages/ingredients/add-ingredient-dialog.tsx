import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createIngredient } from '@/api/create-ingredient'
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

const createIngredientSchema = z.object({
  name: z.string(),
  quantity: z.string().transform((quantity) => Number(quantity)),
})

type CreateIngredientSchema = z.infer<typeof createIngredientSchema>

export function AddIngredientDialog() {
  const [open, setOpen] = useState(false)

  const { register, handleSubmit } = useForm<CreateIngredientSchema>({
    resolver: zodResolver(createIngredientSchema),
  })

  const { mutateAsync: createIngredientFn, isPending: isCreating } =
    useMutation({
      mutationFn: createIngredient,
    })

  async function handleAddIngredient(data: CreateIngredientSchema) {
    try {
      await createIngredientFn({
        name: data.name,
        quantity: data.quantity,
      })

      toast.success('Ingredient registered successfully!')
      setOpen(false)
    } catch {
      toast.error('Error when registering the ingredient.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add new ingredient</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add ingredient</DialogTitle>
          <DialogDescription>
            Fill with the new ingredient information
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleAddIngredient)}>
          <div className="gap-10 px-1">
            <div className="flex-1 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Bun" {...register('name')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="10"
                  {...register('quantity')}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="mt-5 space-x-2">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isCreating}>
                Save
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
