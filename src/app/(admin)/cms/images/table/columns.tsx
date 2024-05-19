'use client'

import { ColumnDef } from '@tanstack/react-table'

import ButtonLinkTable from '@/app/(admin)/_ui/button-link-table'
import MediaImage from '@/components/media-Image'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { ResImage } from '../_lib/api/image'

export const columns: ColumnDef<ResImage>[] = [
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
        name: row.original.name
      }
      return <p>{data.name}</p>
    }
  },
  {
    accessorKey: 'productName',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const product = row.original.Product
      return <ButtonLinkTable data={product} pathUrl='/cms/products' />
    }
  },
  {
    accessorKey: 'image',
    header: ({ column }) => <p>Фото</p>,
    cell: ({ row }) => {
      return (
        <MediaImage
          image={{
            url: row.original.url,
            name: row.original.name
          }}
          className='h-10 w-10 '
        />
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'url',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <Link href={row.original.url} target='_blank'>
          {row.original.url}
        </Link>
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
        <Link href={`/cms/images/${row.original.id}`}>
          <Button variant={'ghost'} size={'icon'}>
            <Pencil2Icon className='w-4 h-4' />
          </Button>
        </Link>
      )
    }
  }
]
