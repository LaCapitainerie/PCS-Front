"use client"

import SuccessPageLayout from "@/components/CustomComponent/layout/StripeLayout";
import { Suspense } from "react";

export default function SuccessPage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessPageLayout />
        </Suspense>
    );
}