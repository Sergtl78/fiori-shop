'use client'

import { ColumnDef } from '@tanstack/react-table'

import { ComboboxPopover } from '@/admin/_ui/combobox-popover'
import ButtonLinkTable from '@/app/(admin)/_ui/button-link-table'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { ResColor } from '../_lib/api/color'

export const columns: ColumnDef<ResColor>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const data = {
        name: row.original.name,
        slug: row.original.slug
        // id: row.original.id
      }
      return <ButtonLinkTable data={data} pathUrl='/cms/colors' />
    }
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const data = {
        name: row.original.name,
        slug: row.original.slug
        // id: row.original.id
      }
      return <ButtonLinkTable isSlug={true} data={data} pathUrl='/cms/colors' />
    }
  },
  {
    accessorKey: 'hex',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const hex: ResColor['hex'] = row.getValue('hex')
      return (
        <div className='flex items-center'>
          <div
            className='mr-2 w-4 h-4 rounded-full'
            style={{ backgroundColor: hex }}
          />
          <span>{hex}</span>
        </div>
      )
    }
  },

  {
    accessorKey: 'products',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const products: ResColor['products'] = row.getValue('products')
      return (
        <ComboboxPopover
          data={products}
          title='Растения'
          pathName='/cms/products'
        />
      )
    }
  },
  {
    accessorKey: 'createdAtFormatted',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    accessorKey: 'updatedAtFormatted',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Link href={`/cms/colors/${row.original.slug}`}>
          <Button variant={'ghost'} size={'icon'}>
            <Pencil2Icon className='w-4 h-4' />
          </Button>
        </Link>
      )
    }
  }
]
