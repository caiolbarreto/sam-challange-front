import { AddSnackDialog } from '@/components/add-snack-dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { SnackTableRow } from './snack-table-row'

export function Snacks() {
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
                  <TableHead>Identifier</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <SnackTableRow
                      key={index}
                      snack={{
                        snackId: '09b473e3-4612-4478-a95c-35802b815679',
                        name: 'testing',
                        description: 'description',
                        price: 2364728,
                      }}
                    />
                  )
                })}
              </TableBody>
            </Table>
          </div>
          {/* {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePagination}
            />
          )} */}
        </div>
      </div>
    </>
  )
}
