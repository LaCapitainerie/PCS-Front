import { ValuableThing } from "@/components/CustomComponent/component/Dashboard/dashboard";
import Dashboard_Layout from "@/components/CustomComponent/layout/DashboardLayout";

export default function Admin() {
    
    const Columns: ValuableThing[] = [];

    return (
        <Dashboard_Layout dataColumn={Columns} customOnes={[]}>
        </Dashboard_Layout>
    );
}
