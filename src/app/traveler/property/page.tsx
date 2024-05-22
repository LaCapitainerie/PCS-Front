import {CookiesProvider} from "next-client-cookies/server";
import BienLayout from "@/components/CustomComponent/layout/BienLayout";

export default function LocatairePageBiens() {
    return (
        <CookiesProvider>
            <BienLayout>
                <></>
            </BienLayout>
        </CookiesProvider>
    );
}
