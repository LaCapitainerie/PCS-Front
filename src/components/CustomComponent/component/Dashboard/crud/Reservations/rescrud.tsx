import { createCrudView } from '@/components/ui/auto-crud/AutoCrud'
import { createAutoForm } from '@/components/ui/auto-crud/createAutoForm'
import { createCrudList } from '@/components/ui/auto-crud/createCrudList'
import { deleteData, fetchData, readData, updateData } from './res-api'
import { fetchData as fetchDataProp } from './../Property/prop-api'
import { Schema, type ObjectType, type ObjectSummary } from './res_schem'
import { useEffect, useState } from 'react'
import { CrudVariant } from '../Crud'
import { User } from '@/type/User'
import { Property } from '@/type/Property'

interface CrudViewProps {
  token: User["token"];
  variant: CrudVariant;
}

export const ReservationCrudView: React.FC<CrudViewProps> = ({token, variant}) => {



  const [filter, setFilter] = useState<Property["id"]>('');
  const [getAllFilter, setGetAllFilter] = useState<string[]>([]);

  useEffect(() => {
    fetchDataProp(token).then((data) => {
      setGetAllFilter(data.props.map((prop) => (prop.id)))
    });
  }, [variant]);  



  const CrudComponent = createCrudView<ObjectType, ObjectSummary>({ id: "" })({
    name: 'ReservationCrudView',
    action: {
      list: () => fetchData(token, filter),
      read: ({ id }) => readData(id),
      update: (prop, { id }) => updateData(id, prop, token),
      delete: (prop) => deleteData(prop, token),
    },
    getId: ({ id }) => id,
    listToDataSource: (list) => list.props,
    FormComponent: createAutoForm({ schema: Schema }),
    ListComponent: createCrudList({
      mode: 'allow',
      setFilter: setFilter,
      filter: { title: 'Property', content: getAllFilter },
      columns: () => [
        {
          accessorKey: 'Date',
          accessorFn: ({ beginDate, endDate }) => `${beginDate.split("T")[0]} ${endDate.split("T")[0]}`,
        },
        {
          accessorKey: 'Customer',
          accessorFn: ({ travelerId }) => travelerId,
        },
        {
          accessorKey: 'Address',
          accessorFn: ({ propertyId }) => propertyId,
        },
        {
          accessorKey: 'Price',
          accessorFn: ({ bill }) => bill.price,
        },
        {
          accessorKey: 'Payment status',
          accessorFn: ({ bill }) => bill.statut,
        },
        {
          accessorKey: 'Services',
          accessorFn: ({ service }) => service.map((service) => service.name).join(", "),
        },
      ],
    }),
  });

  return <CrudComponent />;
};

export default ReservationCrudView;