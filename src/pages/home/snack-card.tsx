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

export function SnackCard() {
  return (
    <Card>
      <CardHeader>
        <img src={DefaultPhoto} alt="burger" className="w-full rounded-md" />
      </CardHeader>
      <CardContent>
        <CardTitle>Burger</CardTitle>
        <CardDescription className="mt-2 flex flex-col">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          repellendus ipsam neque? Adipisci fugit iusto molestiae quas natus,
          eius a ab repellendus dicta quasi, accusamus odit optio dolor sunt.
          Praesentium.
          <span className="mt-3 font-semibold text-zinc-600">R$ 10,90</span>
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
