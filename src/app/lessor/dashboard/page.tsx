import { CrudVariant } from "@/components/CustomComponent/component/Dashboard/crud/Crud";
import { ValuableThing } from "@/components/CustomComponent/component/Dashboard/dashboard";
import Dashboard_Layout from "@/components/CustomComponent/layout/DashboardLayout";

export default function Bailleur() {
    
    const Columns: ValuableThing[] = [
        // {
        //     name: 'Reservations',
        //     path: '/service/all',
        //     valueColumn: 'price',
        //     dateColumn: 'date',
        // }
    ];
    
    const Cruds:CrudVariant[] = ["Properties", "Prestations", "Issues", "Users"]

    return (
        <Dashboard_Layout dataColumn={Columns} customOnes={Cruds} >
        </Dashboard_Layout>
    );
}
