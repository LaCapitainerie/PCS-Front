import { createCrudView } from '@/components/ui/auto-crud/AutoCrud'
import { createAutoForm } from '@/components/ui/auto-crud/createAutoForm'
import { createCrudList } from '@/components/ui/auto-crud/createCrudList'
import { createData, use_deleteData, fetchData, readData, updateData } from './pres-api'
import { Schema, type ObjectType, type ObjectSummary } from './pres_schem'
import { User } from '@/type/User'

interface CrudViewProps {token: User["token"]}

export const PrestationCrudView: React.FC<CrudViewProps> = ({token}) => {



  const CrudComponent = createCrudView<ObjectType, ObjectSummary>({ id: "" })({
    name: 'Prestations',
    action: {
      list: () => fetchData(token),
      create: (payload) => createData(payload, token),
      read: ({ id }) => readData(id),
      update: (pres, { id }) => updateData(id, pres, token),
      delete: (pres) => use_deleteData(pres, token),
    },
    getId: ({ id }) => id,
    listToDataSource: (list) => list.props,
    FormComponent: createAutoForm({ schema: Schema }),
    ListComponent: createCrudList({
      mode: 'make',
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

  return <CrudComponent />;
}

export default PrestationCrudView;