'use client'

import { ColumnDef } from '@tanstack/react-table'

import ButtonLinkTable from '@/app/(admin)/_ui/button-link-table'
import MediaImage from '@/components/media-Image'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Checkbox } from '@/components/ui/checkbox'
import { formatPrice } from '@/lib/utils'
import { ResOrder_itemTable } from '../_lib/api/order_items'
import OrderItemQuantityProduct from '../_ui/order-item-quantity-product'

export const columnsCartItems: ColumnDef<ResOrder_itemTable>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className='mr-4'
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
    accessorKey: 'nameProduct',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const data = {
        name: `${row.original.Product?.name} - ${row.original.Product?.Category?.name}`,
        slug: row.original.Product?.slug
        // id: row.original.id
      }
      return <ButtonLinkTable data={data} pathUrl='/cms/products' />
    }
  },
  {
    id: 'imageProduct',
    accessorKey: 'imageProduct',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <MediaImage
          image={{
            url: row.original.Product?.images[0].url ?? '',
            name: row.original.Product?.name ?? ''
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
      return <OrderItemQuantityProduct orderItem={row.original} />
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
]
