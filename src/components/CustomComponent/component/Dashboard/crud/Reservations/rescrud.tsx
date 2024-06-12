import { createCrudView } from '@/components/ui/auto-crud/AutoCrud'
import { createAutoForm } from '@/components/ui/auto-crud/createAutoForm'
import { createCrudList } from '@/components/ui/auto-crud/createCrudList'
import { createData, use_deleteData, fetchData, readData, updateData } from './res-api'
import { Schema, type ObjectType, type ObjectSummary } from './res_schem'
import { Property } from '@/type/Property'

interface ReservationCrudViewProps {
  propertyID: Property['id'];
}

export const ReservationCrudView: React.FC<ReservationCrudViewProps> = ({ propertyID }) => {

  const CrudComponent = createCrudView<ObjectType, ObjectSummary>({ firstName: 'empty' })({
    name: 'ReservationCrudView',
    action: {
      list: () => fetchData(propertyID),
      create: (payload) => createData(payload),
      read: ({ id }) => readData(id),
      update: (prop, { id }) => updateData(id, prop),
      delete: (prop) => use_deleteData(prop),
    },
    getId: ({ id }) => id,
    listToDataSource: (list) => list.props,
    FormComponent: createAutoForm({ schema: Schema }),
    ListComponent: createCrudList({
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
};

export default ReservationCrudView;