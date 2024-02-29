import { useMutation } from '@tanstack/react-query'
import { Search, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { deleteSnack } from '@/api/deleteSnack'
import { DeleteItemDialog } from '@/components/delete-item-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

interface SnackIngredients {
  snackId: string
  ingredientId: string
  quantity: number
}

interface snackTableRowProps {
  snack: {
    snackId: string
    name: string
    description: string
    price: number
    snackIngredients?: SnackIngredients[]
  }
}

export function SnackTableRow({ snack }: snackTableRowProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  function handleOpenDeleteModal() {
    setOpenDeleteDialog(!openDeleteDialog)
  }

  const { mutateAsync: deleteSnackFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteSnack,
  })

  async function handleDelete() {
    try {
      await deleteSnackFn({ snackId: snack.snackId })

      toast.success('Snack deleted successfully!')
      setOpenDeleteDialog(false)
    } catch {
      toast.error('Error when deleting the snack.')
    }
  }

  return (
    <>
      <DeleteItemDialog
        open={openDeleteDialog}
        type="snack"
        handleOpenModal={handleOpenDeleteModal}
        handleDelete={handleDelete}
        isPending={isDeleting}
      />
      <TableRow>
        <TableCell>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
                <Search className="h-3 w-3" />
                <span className="sr-only">Snack details</span>
              </Button>
            </DialogTrigger>
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {snack.snackId}
        </TableCell>
        <TableCell className="font-medium">{snack.name}</TableCell>
        <TableCell className="text-medium">{snack.description}</TableCell>
        <TableCell className="font-medium">
          {(snack.price / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </TableCell>
        <TableCell>
          <Trash
            className="h-4 w-4 cursor-pointer text-rose-600 dark:text-rose-800"
            onClick={handleOpenDeleteModal}
          />
        </TableCell>
      </TableRow>
    </>
  )
}
