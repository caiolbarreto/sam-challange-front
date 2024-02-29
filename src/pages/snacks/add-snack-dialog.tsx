import { useState } from 'react'

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

export type SelectedIngredientsSchema = Ingredient & {
  currentQuantity: number
}

export function AddSnackDialog() {
  const [selectedIngredients, setSelectedIngredients] = useState<
    SelectedIngredientsSchema[]
  >([])

  function handleSelectIngredients(ingredients: SelectedIngredientsSchema[]) {
    setSelectedIngredients(ingredients)
  }

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
        <div className="scrollbar-hide h-[550px] gap-10 overflow-y-scroll px-1">
          <div className="flex-1 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" />
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
            <DialogClose>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
