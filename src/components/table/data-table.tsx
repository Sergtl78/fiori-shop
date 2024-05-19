'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'

import { ButtonDelete } from '@/app/(admin)/_ui/button-delete'
import { IdsType } from '@/app/(admin)/cms/products/_lib/api/products'
import { DataTablePagination } from '@/components/table/data-table-pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useState } from 'react'
import { DataTableViewOptions } from './data-table-view-options'
import FilterInput from './filter-input'

interface DataTableProps<TData, TValue> {
  title?: string
  columns: ColumnDef<TData, TValue>[]
  data: TData[]

  deleteFn?: (ids: IdsType) => Promise<void>
}

export function DataTable<TData, TValue>({
  title,
  columns,
  data,
  deleteFn
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    createdAtFormatted: false,
    updatedAtFormatted: false,
    slug: false,
    nameMainCategory: false,
    nameSubCategory: false
  })

  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div>
      <div className='flex items-center justify-between py-4 gap-4'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <div className='flex items-center gap-4'>
          <FilterInput table={table} columnId={'name'} />
          {deleteFn && <ButtonDelete table={table} deleteFn={deleteFn} />}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className='rounded-md border overflow-x-scroll'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
