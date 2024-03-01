import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateIngredient } from '@/api/update-ingredient'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

const updateIngredientSchema = z.object({
  name: z.string(),
  quantity: z.string().transform((quantity) => Number(quantity)),
})

type UpdateIngredientSchema = z.infer<typeof updateIngredientSchema>

interface UpdateIngredientDialogProps {
  openDialog: boolean
  handleOpenDialog: () => void
  ingredientId: string
  name: string
  quantity: number
}

export function UpdateIngredientDialog({
  openDialog,
  handleOpenDialog,
  ingredientId,
  name,
  quantity,
}: UpdateIngredientDialogProps) {
  const { register, handleSubmit } = useForm<UpdateIngredientSchema>({
    resolver: zodResolver(updateIngredientSchema),
    defaultValues: {
      name,
      quantity,
    },
  })

  const { mutateAsync: updateIngredientFn, isPending: isCreating } =
    useMutation({
      mutationFn: updateIngredient,
    })

  async function handleUpdateIngredient(data: UpdateIngredientSchema) {
    try {
      await updateIngredientFn({
        ingredientId,
        name: data.name,
        quantity: data.quantity,
      })

      toast.success('Ingredient updated successfully!')
      handleOpenDialog()
    } catch {
      toast.error('Error when updating the ingredient.')
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update ingredient</DialogTitle>
          <DialogDescription>
            Update this ingredient information
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUpdateIngredient)}>
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
