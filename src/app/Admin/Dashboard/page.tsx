import { ValuableThing } from "@/components/CustomComponent/component/Dashboard/dashboard";
import Dashboard_Layout from "@/components/CustomComponent/layout/DashboardLayout";

export default function Admin() {
    
    const Columns: ValuableThing[] = [
        {
            name: 'Prestations',
            path: '/prestation',
            valueColumn: 'Prix',
            dateColumn: 'Date',
        },
        {
            name: 'Reservations',
            path: '/reservation',
            valueColumn: 'Prix',
            dateColumn: 'Date',
        }
    ];

    return (
        <Dashboard_Layout children={undefined} dataColumn={Columns}>
        </Dashboard_Layout>
    );
}
