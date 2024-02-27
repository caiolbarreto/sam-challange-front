import { Search, Trash } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

interface SnackIngredients {
  id: string
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
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
        <Trash className="h-4 w-4 text-rose-700 dark:text-rose-900" />
      </TableCell>
    </TableRow>
  )
}
