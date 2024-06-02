import { createCrudView } from '@/components/ui/auto-crud/AutoCrud'
import { createAutoForm } from '@/components/ui/auto-crud/createAutoForm'
import { createCrudList } from '@/components/ui/auto-crud/createCrudList'
import { createData, use_deleteData, fetchData, readData, updateData } from './pres-api'
import { Schema, type ObjectType, type ObjectSummary } from './pres_schem'

export const PresCrudView = createCrudView<ObjectType, ObjectSummary>({description: 'empty'})({
  name: 'Prestations',
  action: {
    list: fetchData,
    create: createData,
    read: ({ id }) => readData(id),
    update: (pres, { id }) => updateData(id, pres),
    delete: (pres) => use_deleteData(pres),
  },
  getId: ({ id }) => id,
  listToDataSource: (list) => list.props,
  FormComponent: createAutoForm({ schema: Schema }),
  ListComponent: createCrudList({
    columns: () => [
      {
        accessorKey: 'Target',
        accessorFn: ({ targetCustomer }) => targetCustomer,
      },
      {
        accessorKey: 'Address',
        accessorFn: ({ address }) => address,
      },
      {
        accessorKey: 'City',
        accessorFn: ({ city }) => city,
      },
      {
        accessorKey: 'Price',
        accessorFn: ({ price }) => price,
      },
      {
        accessorKey: 'Range',
        accessorFn: ({ rangeAction }) => rangeAction,
      },
      {
        accessorKey: 'Description',
        accessorFn: ({ description }) => description,
      },
    ],
  }),
});