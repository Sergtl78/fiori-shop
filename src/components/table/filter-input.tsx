'use client'
import { translateColumnId } from '@/app/(admin)/_lib/helpers/translate-column-id'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'
import { ComboboxPopoverSearch } from '../combobox-popover-search'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

type Props = {
  table: Table<any>
  columnId: string
}

const FilterInput = ({ table }: Props) => {
  const [columnId, setColumnId] = useState<string>('id')

  const isFiltered = table.getState().columnFilters?.length > 0

  const columnsIds = table
    .getAllColumns()
    .filter(
      column =>
        typeof column.accessorFn !== 'undefined' &&
        column.getCanHide() &&
        column.getCanFilter()
    )
    .map(column => {
      return { value: column.id, label: translateColumnId(column.id) }
    })

  return (
    <div className='flex items-center space-x-2'>
      <Input
        placeholder={`Найти...`}
        value={table.getColumn(columnId)?.getFilterValue() as string}
        onChange={event =>
          table.getColumn(columnId)?.setFilterValue(event.target.value)
        }
        className='max-w-sm '
      />
      <ComboboxPopoverSearch
        value={columnId}
        setValue={setColumnId}
        options={columnsIds}
      />
      {isFiltered && (
        <Button
          variant='ghost'
          onClick={() => table.resetColumnFilters()}
          className='h-8 px-2 lg:px-3'
        >
          Reset
          <Cross1Icon className='ml-2 h-4 w-4' />
        </Button>
      )}
    </div>
  )
}

export default FilterInput
