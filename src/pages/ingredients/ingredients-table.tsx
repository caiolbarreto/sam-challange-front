import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getIngredients } from '@/api/get-ingredients'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { AddIngredientDialog } from './add-ingredient-dialog'
import { IngredientTableRow } from './ingredient-table-row'

export function Ingredients() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageSize = 10

  const pageIndex = z.coerce.number().parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['ingredients', pageIndex],
    queryFn: () => getIngredients(pageIndex, pageSize),
  })

  function handlePagination(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', pageIndex.toString())

      return state
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Ingredients</h1>
        <AddIngredientDialog />
      </div>
      <div className="space-y-2.5">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Identifier</TableHead>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="w-[200px]">Available Quantity</TableHead>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result ? (
                result.data.map((ingredient) => {
                  return (
                    <IngredientTableRow
                      key={ingredient.id}
                      ingredient={ingredient}
                    />
                  )
                })
              ) : (
                <tr>
                  <td>
                    <p>loading</p>
                  </td>
                </tr>
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
  )
}
