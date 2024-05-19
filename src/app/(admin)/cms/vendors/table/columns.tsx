'use client'

import { ColumnDef } from '@tanstack/react-table'

import ButtonLinkTable from '@/app/(admin)/_ui/button-link-table'
import { ComboboxPopover } from '@/app/(admin)/_ui/combobox-popover'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { ResVendor } from '../_lib/api/vendors'

export const columns: ColumnDef<ResVendor>[] = [
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
      return <ButtonLinkTable data={data} pathUrl='/cms/vendors' />
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
      return (
        <ButtonLinkTable isSlug={true} data={data} pathUrl='/cms/vendors' />
      )
    }
  },
  {
    accessorKey: 'products',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const products: ResVendor['products'] = row.getValue('products')
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
        <Link href={`/cms/vendors/${row.original.slug}`}>
          <Button variant={'ghost'} size={'icon'}>
            <Pencil2Icon className='w-4 h-4' />
          </Button>
        </Link>
      )
    }
  }
]
