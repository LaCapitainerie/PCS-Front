import {CookiesProvider} from "next-client-cookies/server";
import Index_Layout from "@/components/CustomComponent/layout/IndexLayout";

const home = () => {
    return (
        <CookiesProvider>
        <Index_Layout/>
        </CookiesProvider>
    );
}

export default home;