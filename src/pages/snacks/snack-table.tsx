import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getSnacks } from '@/api/getSnacks'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { AddSnackDialog } from './add-snack-dialog'
import { SnackTableRow } from './snack-table-row'

export function Snacks() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageSize = 10

  const pageIndex = z.coerce.number().parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['snacks', pageIndex],
    queryFn: () => getSnacks(pageIndex, pageSize),
  })

  function handlePagination(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', pageIndex.toString())

      return state
    })
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Snacks</h1>
          <AddSnackDialog />
        </div>
        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[200px]">Identifier</TableHead>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead className="w-[400px]">Description</TableHead>
                  <TableHead className="w-[150px]">Price</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result ? (
                  result.data.map((snack) => {
                    return <SnackTableRow key={snack.snackId} snack={snack} />
                  })
                ) : (
                  <div>loading</div>
                )}
              </TableBody>
            </Table>
          </div>
          {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePagination}
            />
          )}
        </div>
      </div>
    </>
  )
}
