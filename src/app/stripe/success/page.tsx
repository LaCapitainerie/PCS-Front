"use client"

import SuccessPageLayout from "@/app/stripe/success/StripeLayout";
import { Suspense } from "react";

export default function SuccessPage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessPageLayout />
        </Suspense>
    );
}