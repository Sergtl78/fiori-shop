'use client'

import { ColumnDef } from '@tanstack/react-table'

import { translateStatus } from '@/app/(admin)/_lib/helpers/translate-status'
import ButtonLinkTable from '@/app/(admin)/_ui/button-link-table'
import { ComboboxPopover } from '@/app/(admin)/_ui/combobox-popover'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { formatDate } from '@/lib/utils'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { ResDelivery } from '../_lib/api/deliveries'

export const columns: ColumnDef<ResDelivery>[] = [
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
    accessorKey: 'dateDelivery',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <Link
          href={`/cms/deliveries/${row.original.slug}`}
          className='w-full self-center hover:underline underline-offset-4'
        >
          {formatDate(row.getValue('dateDelivery'))}
        </Link>
      )
    }
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const data = {
        slug: row.original.slug
        // id: row.original.id
      }
      return (
        <ButtonLinkTable isSlug={true} data={data} pathUrl='/cms/deliveries' />
      )
    }
  },
  {
    accessorKey: 'statusDelivery',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return <p>{translateStatus(row.getValue('statusDelivery'))}</p>
    }
  },

  {
    accessorKey: 'delivery_items',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const res: ResDelivery['delivery_items'] = row.getValue('delivery_items')
      const productsAvailability = res.map(item => {
        return {
          id: item.Product?.id,
          name: item.Product?.name,
          slug: item.Product?.slug
        }
      })
      return (
        <ComboboxPopover
          data={productsAvailability}
          title='Товары'
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
        <Link href={`/cms/deliveries/${row.original.slug}`}>
          <Button variant={'ghost'} size={'icon'}>
            <Pencil2Icon className='w-4 h-4' />
          </Button>
        </Link>
      )
    }
  }
]
