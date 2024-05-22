import {CookiesProvider} from "next-client-cookies/server";
import Message_Layout from "@/components/CustomComponent/layout/MessageLayout";

export default function BailleurPageMessage() {
    return (
        <Message_Layout categories={["traveler", "provider"]}>
            <></>
        </Message_Layout>
    );
}
