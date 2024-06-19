import Sidebar from "@/components/Sidebar/Sidebar";
import Calendar from "@/components/demo/index";
import { Property } from "@/type/Property";
import { User } from "@/type/User";


export default function Admin() {

    return (
        <Sidebar user={{} as User} />
    )

    // const prop = {
    //     id: "15e31706-4201-49ed-b808-69e353c20632"
    // } as Property;

    // var getUserfromLocalStorage = "{}";
    
    // if (typeof window !== 'undefined') {
    //     getUserfromLocalStorage = localStorage.getItem("user") || "{}";
    // };

    // const user = JSON.parse(getUserfromLocalStorage) as User;

    // return (
    //     <>
    //         <Calendar property={prop} token={user.token} mode={"lessor"}/>
    //     </>
    // );
}
