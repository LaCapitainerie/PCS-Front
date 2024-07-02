import { createCrudView } from '@/components/ui/auto-crud/AutoCrud'
import { createAutoForm } from '@/components/ui/auto-crud/createAutoForm'
import { createCrudList } from '@/components/ui/auto-crud/createCrudList'
import { createData, use_deleteData, fetchData, readData, updateData } from './prop-api'
import { Schema, type ObjectType, type ObjectSummary } from './prop_schem'
import { User } from '@/type/User'

interface CrudViewProps {}

export const PropertyCrudView: React.FC<CrudViewProps> = () => {


  var getUserfromLocalStorage = "{}";
    
  if (typeof window !== 'undefined') {
      getUserfromLocalStorage = localStorage.getItem("user") || "{}";
  };

  const user = JSON.parse(getUserfromLocalStorage) as User;

  const CrudComponent = createCrudView<ObjectType, ObjectSummary>({ id: "" })({
    name: 'Property',
    action: {
      list: () => fetchData(user.token),
      create: (payload) => createData(payload, user.token),
      read: ({ id }) => readData(id),
      update: (prop, { id }) => updateData(id, prop, user.token),
      delete: (prop) => use_deleteData(prop, user.token),
    },
    getId: ({ id }) => id,
    listToDataSource: (list) => list.props,
    FormComponent: createAutoForm({ schema: Schema }),
    ListComponent: createCrudList({
      mode: 'make',
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

  return <CrudComponent />
}

export default PropertyCrudView;