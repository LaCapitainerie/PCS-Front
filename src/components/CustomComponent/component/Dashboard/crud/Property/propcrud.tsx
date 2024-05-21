import { createCrudView } from '@/components/ui/auto-crud/AutoCrud'
import { createAutoForm } from '@/components/ui/auto-crud/createAutoForm'
import { createCrudList } from '@/components/ui/auto-crud/createCrudList'
import { createProp, deleteProp, fetchProps, readProp, updateProp } from './prop-api'
import { propSchema, type Prop, type PropSummary } from './prop_schem'

export const PropCrudView = createCrudView<Prop, PropSummary>({name: 'empty'})({
  name: 'Property',
  action: {
    list: fetchProps,
    create: createProp,
    read: ({ id }) => readProp(id),
    update: (prop, { id }) => updateProp(id, prop),
    delete: ({ id }) => deleteProp(id),
  },
  getId: ({ id }) => id,
  listToDataSource: (list) => list.props,
  FormComponent: createAutoForm({ schema: propSchema }),
  ListComponent: createCrudList({
    columns: () => [
      {
        accessorKey: 'id',
        accessorFn: ({ id }) => id,
      },
      {
        accessorKey: 'name',
        accessorFn: ({ name }) => name,
      },
      {
        accessorKey: 'type',
        accessorFn: ({ type }) => type,
      },
      {
        accessorKey: 'price',
        accessorFn: ({ price }) => price,
      },
      {
        accessorKey: 'surface',
        accessorFn: ({ surface }) => surface,
      },
      {
        accessorKey: 'address',
        accessorFn: ({ address }) => address,
      },
    ],
  }),
});