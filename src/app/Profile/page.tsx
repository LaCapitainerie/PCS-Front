"use client"

import ProfilLayout from "@/components/CustomComponent/layout/UserInfoLayout";
import { useSearchParams } from 'next/navigation'

export default function PrestaPageBiens() {

    const params = useSearchParams()
    const search = params.get('user')

    if (search) {
        return (
            <ProfilLayout id={search}>
                <></>
            </ProfilLayout>
        );
    }
}
