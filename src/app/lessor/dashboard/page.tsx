import { CrudVariant } from "@/components/CustomComponent/component/Dashboard/crud/Crud";
import { ValuableThing } from "@/components/CustomComponent/component/Dashboard/dashboard";
import Dashboard_Layout from "@/components/CustomComponent/layout/DashboardLayout";
import { CookiesProvider } from "next-client-cookies";

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
    
    const CustomOnes:CrudVariant[] = ["Properties", "Users"]

    return (
        <CookiesProvider>
            <Dashboard_Layout dataColumn={Columns} customOnes={CustomOnes} >
            </Dashboard_Layout>
        </CookiesProvider>
    );
}
