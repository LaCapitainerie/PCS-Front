import {CookiesProvider} from "next-client-cookies/server";
import BienLayout from "@/components/CustomComponent/layout/BienLayout";

export default function PrestaPageBiens() {
    return (
        <CookiesProvider>
            <BienLayout>
                <></>
            </BienLayout>
        </CookiesProvider>
    );
}
