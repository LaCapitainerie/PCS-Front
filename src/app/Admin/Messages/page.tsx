import {CookiesProvider} from "next-client-cookies/server";
import Message_Layout from "@/components/CustomComponent/layout/MessageLayout";

export default function PageMessage() {
    return (
        <Message_Layout categories={["traveler", "lessor", "provider", "admin"]}>
            <></>
        </Message_Layout>
    );
}
