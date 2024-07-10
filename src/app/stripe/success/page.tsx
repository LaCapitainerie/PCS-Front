import { Suspense } from "react";
import SuccessPageLayout from "./success";

export default function SuccessPage() {
    return (
        <Suspense fallback="Loading...">
            <SuccessPageLayout />
        </Suspense>
    );
};