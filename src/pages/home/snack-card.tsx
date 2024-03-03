import DefaultPhoto from '@/assets/default-photo.jpg'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useCart } from '@/context/cart-context'

interface SnackCardProps {
  snack: {
    snackId: string
    name: string
    description: string
    price: number
  }
}

export function SnackCard({ snack }: SnackCardProps) {
  const { cartItems, handleCartAddItem, handleCartRemoveItem } = useCart()
  const isItemInCart =
    cartItems && cartItems.some((item) => item.id === snack.snackId)

  return (
    <Card>
      <CardHeader>
        <img src={DefaultPhoto} alt="burger" className="w-full rounded-md" />
      </CardHeader>
      <CardContent>
        <CardTitle>{snack.name}</CardTitle>
        <CardDescription className="mt-2 flex flex-col">
          <span className="h-[100px]">{snack.description}</span>
          <span className="mt-3 font-semibold text-zinc-600 dark:text-zinc-100">
            {(snack.price / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </CardDescription>
      </CardContent>
      <CardFooter>
        {isItemInCart ? (
          <Button
            variant="coloredOutline"
            className="w-full"
            onClick={() => handleCartRemoveItem(snack.snackId)}
          >
            Remove from cart
          </Button>
        ) : (
          <Button
            variant="default"
            className="w-full"
            onClick={() =>
              handleCartAddItem({
                id: snack.snackId,
                name: snack.name,
                quantity: 1,
              })
            }
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
