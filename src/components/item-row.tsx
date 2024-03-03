import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ItemsRowProps {
  itemId: string
  name: string
  availableQuantity?: number
  handleChangeQuantity: (itemId: string, operation: string) => void
  currentQuantity: number
}

export function ItemRow({
  itemId,
  name,
  availableQuantity,
  currentQuantity,
  handleChangeQuantity,
}: ItemsRowProps) {
  return (
    <div className="mt-2 flex w-full justify-between px-1">
      <div>
        <span className="text-sm font-bold">{name}</span>
        {availableQuantity && (
          <p className="text-xs font-medium text-muted-foreground">
            Available quantity: {availableQuantity}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="text-primary"
          onClick={(event) => {
            event.preventDefault()
            handleChangeQuantity(itemId, 'minus')
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
            handleChangeQuantity(itemId, 'plus')
          }}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
