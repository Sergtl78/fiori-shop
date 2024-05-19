'use client'

import { ColumnDef } from '@tanstack/react-table'

import ButtonAddRoleUser from '@/app/(admin)/_ui/form-items/button-add-role-user'
import SwitchBlockUserForm from '@/app/(admin)/_ui/form-items/switch-block-user-form'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { User } from '@prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { changeBlockUser } from '../../customers/_lib/api/customers'

export const columnsNew: ColumnDef<User>[] = [
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
    accessorKey: 'middleName',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <div className='w-full flex gap-3 '>
          <p>Изменить на</p>
          <ButtonAddRoleUser userId={row.original.id} />
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
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
