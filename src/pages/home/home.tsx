import { Button } from '@/components/ui/button'

import { SnackCard } from './snack-card'

export function Home() {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Snacks</h1>
        <Button variant="outline">Add new snack</Button>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {Array.from({ length: 40 }).map((_, index) => {
          return <SnackCard key={index} />
        })}
      </div>
    </>
  )
}
