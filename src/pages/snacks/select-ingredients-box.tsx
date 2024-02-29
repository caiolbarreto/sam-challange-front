import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

import { getIngredients } from '@/api/getIngredients'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'

import { SelectedIngredientsSchema } from './add-snack-dialog'
import { IngredientRow } from './ingredient-row'

interface SelectIngredientsProps {
  selectedIngredients: SelectedIngredientsSchema[]
  handleSelectIngredients: (ingredients: SelectedIngredientsSchema[]) => void
}

export function SelectIngredients({
  selectedIngredients,
  handleSelectIngredients,
}: SelectIngredientsProps) {
  const [openOptions, setOpenOptions] = useState(false)

  const commandRef = useRef<HTMLDivElement>(null)

  const { data: result } = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => getIngredients(),
  })

  const selectedIngredientIds = selectedIngredients.map(
    (ingredient) => ingredient.id,
  )

  const availableIngredients = result?.data
    ? result.data
        .filter((ingredient) => !selectedIngredientIds.includes(ingredient.id))
        .map((ingredient) => ({
          ...ingredient,
          value: ingredient.name.toLowerCase(),
          label: ingredient.name,
        }))
    : []

  function handleChangeQuantity(ingredientId: string, operation: string) {
    const foundIngredient = selectedIngredients.find(
      (item) => item.id === ingredientId,
    )

    if (!foundIngredient) {
      return selectedIngredients
    }

    const updatedIngredients = selectedIngredients
      .map((item) => {
        if (item.id === ingredientId) {
          const currentQuantity = item.currentQuantity
          if (operation === 'minus' && currentQuantity > 0) {
            return { ...item, currentQuantity: currentQuantity - 1 }
          } else if (operation === 'plus') {
            return { ...item, currentQuantity: currentQuantity + 1 }
          }
        }
        return item
      })
      .filter((item) => item.currentQuantity > 0)

    handleSelectIngredients(updatedIngredients)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setOpenOptions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {availableIngredients && (
        <div ref={commandRef}>
          <Command className="b-0 mb-5 w-[450px] border p-0">
            <CommandInput
              placeholder="Search framework..."
              className="h-9"
              onFocus={() => setOpenOptions(true)}
            />
            {openOptions && (
              <CommandList>
                <CommandEmpty>No ingredients found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-[125px]">
                    {availableIngredients.map((ingredient) => (
                      <CommandItem
                        className="w-full"
                        key={ingredient.id}
                        value={ingredient.value}
                        onSelect={() => {
                          handleSelectIngredients([
                            ...selectedIngredients,
                            {
                              ...ingredient,
                              currentQuantity: 1,
                            },
                          ])
                        }}
                      >
                        {ingredient.name}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            )}
          </Command>
        </div>
      )}
      {selectedIngredients.map((ingredient) => {
        return (
          <IngredientRow
            key={ingredient.id}
            ingredientId={ingredient.id}
            name={ingredient.name}
            availableQuantity={ingredient.quantity}
            handleChangeQuantity={handleChangeQuantity}
            currentQuantity={ingredient.currentQuantity}
          />
        )
      })}
    </>
  )
}
