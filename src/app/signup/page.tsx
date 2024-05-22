"use client"

import {CookiesProvider} from "next-client-cookies/server";
import SignupLayout from "@/components/CustomComponent/layout/SignupLayout";

export default function PrestaPageBiens() {

    return (
        <CookiesProvider>
            <SignupLayout/>
        </CookiesProvider>
    );
}
