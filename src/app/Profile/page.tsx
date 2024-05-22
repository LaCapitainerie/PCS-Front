"use client"

import {CookiesProvider} from "next-client-cookies/server";
import ProfilLayout from "@/components/CustomComponent/layout/UserInfoLayout";
import { useSearchParams } from 'next/navigation'

export default function PrestaPageBiens() {

    const params = useSearchParams()
    const search = params.get('user')

    if (search) {
        return (
            <CookiesProvider>
                <ProfilLayout id={search}>
                 <></>
                </ProfilLayout>
            </CookiesProvider>
        );
    };
}
