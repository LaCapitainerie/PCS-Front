import { createCrudView } from '@/components/ui/auto-crud/AutoCrud'
import { createAutoForm } from '@/components/ui/auto-crud/createAutoForm'
import { createCrudList } from '@/components/ui/auto-crud/createCrudList'
import { createData, use_deleteData, fetchData, readData, updateData } from './user-api'
import { Schema, type ObjectType, type ObjectSummary } from './user_schem'
import { User } from '@/type/User'

interface CrudViewProps {token: User["token"]}

export const UserCrudView: React.FC<CrudViewProps> = ({token}) => {


  var getUserfromLocalStorage = "{}";
    
  if (typeof window !== 'undefined') {
      getUserfromLocalStorage = localStorage.getItem("user") || "{}";
  };

  const user = JSON.parse(getUserfromLocalStorage) as User;

  const CrudComponent = createCrudView<ObjectType, ObjectSummary>({ id: "" })({
    name: 'UserCrudView',
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
          accessorFn: ({ firstName, lastName }) => `${firstName} ${lastName}`,
        },
        {
          accessorKey: 'type',
          accessorFn: ({ type }) => type,
        },
        {
          accessorKey: 'description',
          accessorFn: ({ description }) => description,
        },
      ],
    }),
  });
  
  return <CrudComponent />;
}

export default UserCrudView;