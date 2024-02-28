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

interface SnackCardProps {
  name: string
  description: string
  price: number
}

export function SnackCard({ name, description, price }: SnackCardProps) {
  return (
    <Card>
      <CardHeader>
        <img src={DefaultPhoto} alt="burger" className="w-full rounded-md" />
      </CardHeader>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="mt-2 flex flex-col">
          <span className="h-[100px]">{description}</span>
          <span className="mt-3 font-semibold text-zinc-600 dark:text-zinc-100">
            {(price / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}
