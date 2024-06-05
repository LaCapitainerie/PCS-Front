import { createCrudView } from '@/components/ui/auto-crud/AutoCrud'
import { createAutoForm } from '@/components/ui/auto-crud/createAutoForm'
import { createCrudList } from '@/components/ui/auto-crud/createCrudList'
import { createData, use_deleteData, fetchData, readData, updateData } from './prop-api'
import { Schema, type ObjectType, type ObjectSummary } from './prop_schem'

export const PropCrudView = createCrudView<ObjectType, ObjectSummary>({name: 'empty'})({
  name: 'Property',
  action: {
    list: () => fetchData(),
    create: (payload) => createData(payload, ),
    read: ({ id }) => readData(id),
    update: (prop, { id }) => updateData(id, prop, ),
    delete: (prop) => use_deleteData(prop, ),
  },
  getId: ({ id }) => id,
  listToDataSource: (list) => list.props,
  FormComponent: createAutoForm({ schema: Schema }),
  ListComponent: createCrudList({
    columns: () => [
      {
        accessorKey: 'name',
        accessorFn: ({ name }) => name,
      },
      {
        accessorKey: 'type',
        accessorFn: ({ type }) => type,
      },
      {
        accessorKey: 'description',
        accessorFn: ({ description }) => description,
      },
      {
        accessorKey: 'address',
        accessorFn: ({ address }) => address,
      },
      {
        accessorKey: 'price',
        accessorFn: ({ price }) => price,
      },
      {
        accessorKey: 'surface',
        accessorFn: ({ surface }) => surface,
      },
    ],
  }),
});