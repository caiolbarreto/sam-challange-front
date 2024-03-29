import { useQuery } from '@tanstack/react-query'

import { getSnacks } from '@/api/get-snacks'

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
            return <SnackCard key={snack.snackId} snack={snack} />
          })
        ) : (
          <div>loading</div>
        )}
      </div>
    </>
  )
}
