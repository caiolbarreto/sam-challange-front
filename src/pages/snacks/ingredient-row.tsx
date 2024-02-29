import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface IngredientsRowProps {
  ingredientId: string
  name: string
  availableQuantity: number
  handleChangeQuantity: (ingredientId: string, operation: string) => void
  currentQuantity: number
}

export function IngredientRow({
  ingredientId,
  name,
  availableQuantity,
  currentQuantity,
  handleChangeQuantity,
}: IngredientsRowProps) {
  return (
    <div className="mt-2 flex w-full justify-between px-1">
      <div>
        <span className="text-sm font-bold">{name}</span>
        <p className="text-xs font-medium text-muted-foreground">
          Available quantity: {availableQuantity}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="text-primary"
          onClick={(event) => {
            event.preventDefault()
            handleChangeQuantity(ingredientId, 'minus')
          }}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="text-xs">{currentQuantity}</span>
        <Button
          variant="ghost"
          disabled={currentQuantity === availableQuantity}
          className="text-primary"
          onClick={(event) => {
            event.preventDefault()
            handleChangeQuantity(ingredientId, 'plus')
          }}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
