import { useMutation } from '@tanstack/react-query'
import { Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { deleteIngredient } from '@/api/delete-ingredient'
import { DeleteItemDialog } from '@/components/delete-item-dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { UpdateIngredientDialog } from './update-ingredient-dialog'

interface ingredientTableRowProps {
  ingredient: {
    id: string
    name: string
    quantity: number
  }
}

export function IngredientTableRow({ ingredient }: ingredientTableRowProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)

  function handleOpenDeleteDialog() {
    setOpenDeleteDialog(!openDeleteDialog)
  }

  function handleOpenUpdateDialog() {
    setOpenUpdateDialog(!openUpdateDialog)
  }

  const { mutateAsync: deleteIngredientFn, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteIngredient,
    })

  async function handleDelete() {
    try {
      await deleteIngredientFn({ ingredientId: ingredient.id })

      toast.success('Ingredient deleted successfully!')
      setOpenDeleteDialog(false)
    } catch {
      toast.error('Error when deleting the ingredient.')
    }
  }

  return (
    <>
      <DeleteItemDialog
        open={openDeleteDialog}
        type="ingredient"
        handleOpenModal={handleOpenDeleteDialog}
        handleDelete={handleDelete}
        isPending={isDeleting}
      />
      <UpdateIngredientDialog
        openDialog={openUpdateDialog}
        handleOpenDialog={handleOpenUpdateDialog}
        ingredientId={ingredient.id}
        name={ingredient.name}
        quantity={ingredient.quantity}
      />
      <TableRow>
        <TableCell className="font-mono text-xs font-medium">
          {ingredient.id}
        </TableCell>
        <TableCell className="font-medium">{ingredient.name}</TableCell>
        <TableCell className="text-medium">{ingredient.quantity}</TableCell>
        <TableCell>
          <Pencil
            className="h-4 w-4 cursor-pointer text-muted-foreground"
            onClick={handleOpenUpdateDialog}
          />
        </TableCell>
        <TableCell>
          <Trash
            className="h-4 w-4 cursor-pointer text-rose-600 dark:text-rose-800"
            onClick={handleOpenDeleteDialog}
          />
        </TableCell>
      </TableRow>
    </>
  )
}
