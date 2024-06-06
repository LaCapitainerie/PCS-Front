"use client"

import ProfilLayout from "@/components/CustomComponent/layout/ProfileLayout";
import { Suspense } from "react";

export default function PrestaPageBiens() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfilLayout>
                <></>
            </ProfilLayout>
        </Suspense>
    );
}
