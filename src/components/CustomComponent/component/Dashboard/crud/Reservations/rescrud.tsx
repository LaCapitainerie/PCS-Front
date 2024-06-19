import { createCrudView } from '@/components/ui/auto-crud/AutoCrud'
import { createAutoForm } from '@/components/ui/auto-crud/createAutoForm'
import { createCrudList } from '@/components/ui/auto-crud/createCrudList'
import { deleteData, fetchData, readData, updateData } from './res-api'
import { fetchData as fetchDataProp } from './../Property/prop-api'
import { Schema, type ObjectType, type ObjectSummary } from './res_schem'
import { useEffect, useState } from 'react'
import { CrudVariant } from '../Crud'

interface ReservationCrudViewProps {
  variant: CrudVariant;
}

export const ReservationCrudView: React.FC<ReservationCrudViewProps> = (variant) => {

  const [filter, setFilter] = useState<string>('');
  const [getAllFilter, setGetAllFilter] = useState<string[]>([]);

  useEffect(() => {
    fetchDataProp().then((data) => {
      setGetAllFilter(data.props.map((prop) => (prop.id)))
    });
  }, [variant]);  

  const CrudComponent = createCrudView<ObjectType, ObjectSummary>({ id: "" })({
    name: 'ReservationCrudView',
    action: {
      list: () => fetchData(filter),
      read: ({ id }) => readData(id),
      update: (prop, { id }) => updateData(id, prop),
      delete: (prop) => deleteData(prop),
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
      ],
    }),
  });

  return <CrudComponent />;
};

export default ReservationCrudView;