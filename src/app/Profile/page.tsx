"use client"

import ProfilLayout from "@/components/CustomComponent/layout/ProfileLayout";
import LoadingProfilLayout from "@/components/CustomComponent/loading_layout/ProfileLayout";
import { Suspense } from "react";

export default function PrestaPageBiens() {

    return (
        <Suspense fallback={<LoadingProfilLayout/>}>
            <ProfilLayout>
                <></>
            </ProfilLayout>
        </Suspense>
    );
}
