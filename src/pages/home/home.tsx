import { useQuery } from '@tanstack/react-query'

import { getSnacks } from '@/api/getSnacks'

import { SnackCard } from './snack-card'

export function Home() {
  const { data: result } = useQuery({
    queryKey: ['snacks'],
    queryFn: () => getSnacks(),
  })

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Catalog</h1>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {result ? (
          result.data.map((snack) => {
            return (
              <SnackCard
                key={snack.snackId}
                name={snack.name}
                description={snack.description}
                price={snack.price}
              />
            )
          })
        ) : (
          <div>loading</div>
        )}
      </div>
    </>
  )
}
