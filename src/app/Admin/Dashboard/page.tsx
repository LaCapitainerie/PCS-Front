import { CrudVariant } from "@/components/CustomComponent/component/Dashboard/crud/Crud";
import { ValuableThing } from "@/components/CustomComponent/component/Dashboard/dashboard";
import Dashboard_Layout from "@/components/CustomComponent/layout/DashboardLayout";

export default function Admin() {
    
    const Columns: ValuableThing[] = [];

    const Cruds: CrudVariant[] = ["Users", "Issues"];

    return (
        <Dashboard_Layout dataColumn={Columns} customOnes={Cruds}>
        </Dashboard_Layout>
    );
}
