'use client'

import { ColumnDef } from '@tanstack/react-table'

import ButtonLinkTable from '@/app/(admin)/_ui/button-link-table'
import MediaImage from '@/components/media-Image'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { formatPrice } from '@/lib/utils'
import { ResPre_order_itemTable } from '../_lib/api/pre_order_items'

export const columnsCartItems: ColumnDef<ResPre_order_itemTable>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },

  {
    accessorKey: 'nameProduct',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const data = {
        name: `${row.original.Product?.Category?.name} - ${row.original.Product?.name}`,
        slug: row.original.Product?.slug
      }
      return <ButtonLinkTable data={data} pathUrl='/cms/products' />
    }
  },
  {
    id: 'imageProduct',
    accessorKey: 'imageProduct',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const data = {
        name: `${row.original.Product?.Category?.name} - ${row.original.Product?.name}`,
        slug: row.original.Product?.slug
        // id: row.original.id
      }
      return (
        <MediaImage
          image={{
            url: row.original.Product?.images[0].url ?? '',
            name: row.original.Product?.name ?? 'фото'
          }}
          className='h-10 w-10 '
        />
      )
    }
  },
  {
    accessorKey: 'quantityProduct',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <p className='w-full text-center'>
          {row.original.quantityProduct} уп. X{' '}
          {row.original.Product?.min_quantity}шт.
        </p>
      )
    },
    filterFn: 'includesString'
  },

  {
    accessorKey: 'priceCartItem',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <p className='w-full text-center'>
          {formatPrice(row.original.priceCartItem)}
        </p>
      )
    },
    filterFn: 'includesString'
  },

  {
    accessorKey: 'createdAtFormatted',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    accessorKey: 'updatedAtFormatted',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  }

  /* {
    id: 'actions',
    cell: ({ row }) => {
      return <ButtonUpdateAvailability availability={row.original} />
    }
  } */
]
