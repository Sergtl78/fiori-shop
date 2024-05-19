'use client'

import { ColumnDef } from '@tanstack/react-table'

import { changeVisibleProduct } from '@/app/(admin)/_lib/api/for-forms/changeVisibleFormItems'
import ButtonLinkTable from '@/app/(admin)/_ui/button-link-table'
import SwitchVisibleForm from '@/app/(admin)/_ui/form-items/switch-visible-form'
import MediaImage from '@/components/media-Image'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { formatPrice } from '@/lib/utils'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { ResProducts } from '../_lib/api/products'

export const columns: ColumnDef<ResProducts>[] = [
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
        slug: row.original.slug
        // id: row.original.id
      }
      return <ButtonLinkTable data={data} pathUrl='/cms/products' />
    }
  },
  {
    id: 'slug',
    accessorKey: 'slug',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const data = {
        name: row.original.name,
        slug: row.original.slug
        // id: row.original.id
      }
      return (
        <ButtonLinkTable isSlug={true} data={data} pathUrl='/cms/products' />
      )
    }
  },
  {
    id: 'quantity',
    accessorKey: 'quantity',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    filterFn: 'includesString'
  },
  {
    id: 'price',
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const price: number = row.getValue('price')
      return formatPrice(price).toString()
    },
    filterFn: 'includesString'
  },

  {
    id: 'nameMainCategory',
    accessorKey: 'nameMainCategory',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const mainCategory = row.original.Main_category
      return (
        <ButtonLinkTable data={mainCategory} pathUrl='/cms/main_categories' />
      )
    }
  },

  {
    id: 'nameCategory',
    accessorKey: 'nameCategory',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const product = row.original
      const category = product.Category

      return (
        <Link href={`/cms/categories/${category?.slug}`} className='w-full '>
          <Button
            variant='link'
            className='w-full justify-start text-left text-foreground'
          >
            {category?.name}
          </Button>
        </Link>
      )
    }
  },
  {
    id: 'nameSubCategory',
    accessorKey: 'nameSubCategory',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const sub_category = row.original.Sub_category
      return (
        <Link
          href={`/cms/sub_categories/${sub_category?.slug}`}
          className='w-full '
        >
          <Button
            variant='link'
            className='w-full justify-start text-left text-foreground'
          >
            {sub_category?.name}
          </Button>
        </Link>
      )
    }
  },
  {
    id: 'nameVendor',
    accessorKey: 'nameVendor',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const vendor = row.original.Vendor
      return (
        <Link href={`/cms/vendors/${vendor?.slug}`} className='w-full '>
          <Button
            variant='link'
            className='w-full justify-start text-left text-foreground'
          >
            {vendor?.name}
          </Button>
        </Link>
      )
    }
  },
  {
    id: 'nameColor',
    accessorKey: 'nameColor',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const color = row.original.Color
      return (
        <Link href={`/cms/colors/${color?.slug}`} className='w-full '>
          <Button
            variant='link'
            className='w-full justify-start text-left text-foreground'
          >
            <div className='flex items-center'>
              <div
                className='mr-2 w-4 h-4 rounded-full'
                style={{ backgroundColor: color?.hex }}
              />
              <span>{color?.name}</span>
            </div>
          </Button>
        </Link>
      )
    }
  },
  {
    id: 'images',
    accessorKey: 'images',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      const images = row.original.images
      return (
        <Link
          href={`/cms/products/${row.original.slug}`}
          className='w-full flex flex-row gap-1 '
        >
          {images.length > 0 ? (
            images.map((image, index) => (
              <MediaImage
                key={index}
                image={{
                  url: image.url,
                  name: row.original.name
                }}
                className='h-10 w-10 '
              />
            ))
          ) : (
            <span className='text-foreground'>Нет изображений</span>
          )}
        </Link>
      )
    }
  },
  {
    id: 'createdAtFormatted',
    accessorKey: 'createdAtFormatted',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'updatedAtFormatted',
    accessorKey: 'updatedAtFormatted',
    header: ({ column }) => <DataTableColumnHeader column={column} />
  },
  {
    id: 'visible',
    accessorKey: 'visible',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <SwitchVisibleForm
          visible={row.original.visible}
          id={row.original.id}
          changeVisibleFN={changeVisibleProduct}
        />
      )
    },
    enableHiding: false
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Link href={`/cms/products/${row.original.slug}`}>
          <Button variant={'ghost'} size={'icon'}>
            <Pencil2Icon className='w-4 h-4' />
          </Button>
        </Link>
      )
    }
  }
]
