'use client'

import { ColumnDef } from '@tanstack/react-table'

import { ComboboxPopover } from '@/app/(admin)/_ui/combobox-popover'
import SwitchBlockUserForm from '@/app/(admin)/_ui/form-items/switch-block-user-form'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { changeBlockUser, ResCustomer } from '../_lib/api/customers'

export const columns: ColumnDef<ResCustomer>[] = [
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
        id: row.original.id
      }
      return (
        <Link
          href={`/crm/customers/${row.original.id}`}
          className='hover:underline underline-offset-4'
        >
          {row.getValue('name')}
        </Link>
      )
    }
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    accessorKey: 'shops',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const categories: ResCustomer['shops'] = row.getValue('shops')
      return (
        <ComboboxPopover
          data={categories}
          title='Магазины'
          pathName='/admin/categories'
        />
      )
    },
    enableHiding: false
  },
  {
    accessorKey: 'personalDiscount',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <p className='w-full text-center'>
          {row.getValue('personalDiscount')} %
        </p>
      )
    },
    filterFn: 'includesString'
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <Link href={`tel:${row.getValue('phone')}`} className='w-full '>
          <Button
            variant='link'
            className='text-start font-medium text-foreground '
            size='sm'
          >
            {row.getValue('phone')}
          </Button>
        </Link>
      )
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <Link href={`mailto:${row.getValue('email')}`} className='w-full '>
          <Button
            variant='link'
            className='text-start font-medium text-foreground '
            size='sm'
          >
            {row.getValue('email')}
          </Button>
        </Link>
      )
    }
  },
  {
    accessorKey: 'tin',
    header: ({ column }) => <DataTableColumnHeader column={column} />
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
    id: 'blocked',
    accessorKey: 'blocked',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <SwitchBlockUserForm
          blocked={row.original.blocked}
          id={row.original.id}
          changeVisibleFN={changeBlockUser}
        />
      )
    },
    enableHiding: false
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Link href={`/crm/customers/${row.original.id}`}>
          <Button variant={'ghost'} size={'icon'}>
            <Pencil2Icon className='w-4 h-4' />
          </Button>
        </Link>
      )
    }
  }
]
