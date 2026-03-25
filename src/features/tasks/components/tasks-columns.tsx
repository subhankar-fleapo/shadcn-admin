import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { statuses } from '../data/data'
import { type Task } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const tasksColumns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    meta: {
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='truncate font-medium'>{row.getValue('name')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'key',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='API Key' />
    ),
    meta: {
      className: 'ps-1 max-w-0 w-1/3',
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='truncate font-medium'>{row.getValue('key')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center gap-2'>
          {status.icon && (
            <status.icon className='size-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-3' },
    cell: ({ row }) => {
      // console.log(123123, row.getValue('createdAt'))
      const createdAt = new Date(row.getValue('createdAt'))
      return (
        <div className='flex space-x-2'>
          <span className='truncate font-medium'>
            {createdAt.toISOString()}
          </span>
        </div>
      )

      // const priority = priorities.find(
      //   (priority) => priority.value === row.getValue('createdAt')
      // )

      // if (!priority) {
      //   return null
      // }

      // return (
      //   <div className='flex items-center gap-2'>
      //     {priority.icon && (
      //       <priority.icon className='size-4 text-muted-foreground' />
      //     )}
      //     <span>{priority.label}</span>
      //   </div>
      // )
    },
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id))
    // },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
