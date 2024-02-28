import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Separator } from '../../components/ui/separator'

export function AddSnackDialog() {
  return (
    <Dialog>
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
        <div className="flex gap-10">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold">
                Name
              </Label>
              <Input id="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="font-semibold">
                Description
              </Label>
              <Input id="description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="font-semibold">
                Price
              </Label>
              <Input id="price" />
            </div>
          </div>
          <Separator orientation="vertical" />

          <div>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
            <p>oadsfkajhsdfajdfs</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
