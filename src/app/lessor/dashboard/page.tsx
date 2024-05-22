import { CrudVariant } from "@/components/CustomComponent/component/Dashboard/crud/Crud";
import { ValuableThing } from "@/components/CustomComponent/component/Dashboard/dashboard";
import Dashboard_Layout from "@/components/CustomComponent/layout/DashboardLayout";

export default function Bailleur() {
    
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
    
    const CustomOnes:CrudVariant[] = ["Properties"]

    return (
        <Dashboard_Layout dataColumn={Columns} customOnes={CustomOnes} >
        </Dashboard_Layout>
    );
}
