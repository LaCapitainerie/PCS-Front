import {CookiesProvider} from "next-client-cookies/server";
import { ValuableThing } from "@/components/CustomComponent/component/Dashboard/dashboard";
import Dashboard_Layout from "@/components/CustomComponent/layout/DashboardLayout";

export default function Bailleur() {
    
    const Columns: ValuableThing[] = [];

    return (
        <CookiesProvider>
            <Dashboard_Layout dataColumn={Columns}>
            </Dashboard_Layout>
        </CookiesProvider>
    );
}
