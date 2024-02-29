import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Button } from './ui/button'

interface DeleteItemDialog {
  open: boolean
  type: string
  handleDelete: () => void
  handleOpenModal: () => void
  isPending: boolean
}

export function DeleteItemDialog({
  open,
  type,
  handleDelete,
  handleOpenModal,
  isPending,
}: DeleteItemDialog) {
  return (
    <Dialog open={open} onOpenChange={handleOpenModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {type}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {type}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="mt-5 space-x-2">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button onClick={handleDelete} disabled={isPending}>
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
