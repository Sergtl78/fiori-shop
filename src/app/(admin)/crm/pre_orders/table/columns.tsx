'use client'

import { ColumnDef } from '@tanstack/react-table'

import ButtonLinkTable from '@/app/(admin)/_ui/button-link-table'
import { ComboboxOrderTable } from '@/app/(admin)/_ui/combobox-orders-table'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { formatOrderNumber, formatPrice } from '@/lib/utils'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { ResPre_orderTable } from '../_lib/api/pre_orders'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ResPre_orderTable>[] = [
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
    accessorKey: 'number_order',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <Link href={`/crm/pre_orders/${row.original.id}`} className='w-full'>
          <Button
            variant='link'
            className='text-start font-medium text-foreground '
            size='sm'
          >
            {formatOrderNumber(row.getValue('number_order'))}
          </Button>
        </Link>
      )
    },
    filterFn: 'includesString'
  },
  {
    accessorKey: 'datePre_order',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return <p>{row.original.datePre_order}</p>
    },
    filterFn: 'includesString'
  },
  {
    accessorKey: 'statusOrder',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return <p className=''>{row.original.statusOrder}</p>
    }
  },
  {
    accessorKey: 'userName',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const data = {
        name: row.original.userName,
        id: row.original.userId
      }
      return <ButtonLinkTable data={data} pathUrl='/crm/customers' />
    }
  },
  {
    accessorKey: 'shopName',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const data = {
        name: row.original.shopName,
        //slug: row.original.slug,
        id: row.original.id
      }
      return <ButtonLinkTable data={data} pathUrl='/admin/customers_shops' />
    }
  },

  {
    accessorKey: 'pre_order_items',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const pre_order_items: ResPre_orderTable['pre_order_items'] =
        row.original.pre_order_items
      return (
        <ComboboxOrderTable
          data={pre_order_items}
          title='Товары'
          pathName='/cms/products'
        />
      )
    }
  },
  {
    accessorKey: 'total_amount',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return <p>{row.getValue('total_amount')} шт.</p>
    }
  },
  {
    accessorKey: 'total_prise',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const formatted = formatPrice(row.getValue('total_prise'))

      return <div className='text-start font-medium'>{formatted}</div>
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
        <Link href={`/crm/orders/${row.original.id}`}>
          <Button variant={'ghost'} size={'icon'}>
            <Pencil2Icon className='w-4 h-4' />
          </Button>
        </Link>
      )
    }
  }
]
