import ProfilLayout from "@/components/CustomComponent/layout/UserInfoLayout";
import { Suspense } from 'react'

function SearchBarFallback() {
    return <>placeholder</>
}

export default function PrestaPageBiens() {


    return (
    <Suspense fallback={<SearchBarFallback />}>
        <ProfilLayout>
        </ProfilLayout>
    </Suspense>)
}
