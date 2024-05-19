'use client'

import { ColumnDef } from '@tanstack/react-table'

import ButtonLinkTable from '@/app/(admin)/_ui/button-link-table'
import MediaImage from '@/components/media-Image'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Checkbox } from '@/components/ui/checkbox'
import { formatPrice } from '@/lib/utils'
import { ResDelivery_item } from '../_lib/api/delivery_items'
import ButtonUpdateDelivery_item from '../_ui/button-update-delivery_item'

export const columnsDelivery: ColumnDef<ResDelivery_item>[] = [
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
    accessorKey: 'slug',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const data = {
        slug: row.original.id
        // id: row.original.id
      }
      return (
        <ButtonLinkTable isSlug={true} data={data} pathUrl='/cms/vendors' />
      )
    }
  },

  {
    accessorKey: 'dateDelivery_itemFormatted',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return <p>{row.original.dateDelivery_itemFormatted}</p>
    }
  },

  {
    accessorKey: 'nameProduct',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const data = {
        name: row.original.Product?.name,
        slug: row.original.Product?.slug
        // id: row.original.id
      }
      return <ButtonLinkTable data={data} pathUrl='/cms/products' />
    }
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return <p className='text-center'>{formatPrice(row.original.price)}</p>
    }
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return <p className='text-center'>{row.original.quantity} шт.</p>
    }
  },
  {
    accessorKey: 'imageProduct',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const data = row.original.imageProduct
      return (
        data && (
          <MediaImage
            image={{
              url: data,
              name: row.original.nameProduct ?? 'Фото'
            }}
            className='h-10 w-10 '
          />
        )
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
      return <ButtonUpdateDelivery_item delivery_item={row.original} />
    }
  }
]
