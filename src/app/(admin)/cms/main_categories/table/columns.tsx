'use client'

import { ColumnDef } from '@tanstack/react-table'

import ButtonLinkTable from '@/app/(admin)/_ui/button-link-table'
import { ComboboxPopover } from '@/app/(admin)/_ui/combobox-popover'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { ResMain_category } from '../_lib/api/main_categories'

export const columns: ColumnDef<ResMain_category>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='flex items-center w-full gap-2 mr-4'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      </div>
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
      return <ButtonLinkTable data={data} pathUrl='/cms/main_categories' />
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
        <ButtonLinkTable
          isSlug={true}
          data={data}
          pathUrl='/cms/main_categories'
        />
      )
    }
  },

  {
    accessorKey: 'categories',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const categories: ResMain_category['categories'] =
        row.getValue('categories')
      return (
        <ComboboxPopover
          data={categories}
          title='Вид'
          pathName='/cms/categories'
        />
      )
    },
    enableHiding: false
  },
  {
    accessorKey: 'sub_categories',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const sub_categories: ResMain_category['sub_categories'] =
        row.getValue('sub_categories')
      return (
        <ComboboxPopover
          data={sub_categories}
          title='Тип'
          pathName='/cms/sub_categories'
        />
      )
    },
    enableHiding: false
  },
  {
    accessorKey: 'products',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const products: ResMain_category['products'] = row.getValue('products')
      return (
        <ComboboxPopover
          data={products}
          title='Растения'
          pathName='/cms/products'
        />
      )
    },
    enableHiding: false
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
        <Link href={`/cms/main_categories/${row.original.slug}`}>
          <Button variant={'ghost'} size={'icon'}>
            <Pencil2Icon className='w-4 h-4' />
          </Button>
        </Link>
      )
    }
  }
]
