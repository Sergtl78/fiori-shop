'use client'

import { ColumnDef } from '@tanstack/react-table'

import MediaImage from '@/components/media-Image'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ResSliderPromo } from '../_lib/api/slider_promo'

export const columns: ColumnDef<ResSliderPromo>[] = [
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
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <Link
          href={`/cms/slider_promo/${row.original.id}`}
          className={cn(
            buttonVariants({ variant: 'link', size: 'sm' }),
            'w-full justify-start text-left text-foreground'
          )}
        >
          {row.original.title}
        </Link>
      )
    }
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    accessorKey: 'textColor',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <div className='w-full flex justify-start items-center px-4'>
          <div
            style={{
              background: row.original.textColor
            }}
            className='w-4 h-4 rounded-full mr-2 border border-foreground'
          />
          {row.original.textColor}
        </div>
      )
    }
  },
  {
    accessorKey: 'url',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    accessorKey: 'image',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <MediaImage
          image={{
            url: row.original.image ?? '',
            name: row.original.title ?? ''
          }}
          className='h-10 w-10 '
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
  }
]
