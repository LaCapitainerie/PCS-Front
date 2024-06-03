import { createCrudView } from '@/components/ui/auto-crud/AutoCrud'
import { createAutoForm } from '@/components/ui/auto-crud/createAutoForm'
import { createCrudList } from '@/components/ui/auto-crud/createCrudList'
import { createData, use_deleteData, fetchData, readData, updateData } from './prop-api'
import { Schema, type ObjectType, type ObjectSummary } from './prop_schem'
import { User } from '@/type/User'

export const PropCrudView = ({token}: {token: User["token"]}) => createCrudView<ObjectType, ObjectSummary>({name: 'empty'})({
  name: 'Property',
  action: {
    list: () => fetchData(token),
    create: (payload) => createData(payload, token),
    read: ({ id }) => readData(id),
    update: (prop, { id }) => updateData(id, prop, token),
    delete: (prop) => use_deleteData(prop, token),
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