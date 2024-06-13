import Calendar from "@/components/demo/index";
import { Property } from "@/type/Property";
import { User } from "@/type/User";


export default function Admin() {

    const prop = {
        id: "280bf0d1-8df8-432a-9271-2a80d17ad1a2"
    } as Property;

    var getUserfromLocalStorage = "{}";
    
    if (typeof window !== 'undefined') {
        getUserfromLocalStorage = localStorage.getItem("user") || "{}";
    };

    const user = JSON.parse(getUserfromLocalStorage) as User;

    return (
        <>
            <Calendar property={prop} token={user.token}/>
        </>
    );
}
