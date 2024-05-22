"use client"

import {CookiesProvider} from "next-client-cookies/server";
import LoginLayout from "@/components/CustomComponent/layout/LoginLayout";

// {
//   "type": "provider",
//   "mail": "thomas.poupard@outlook.com",
//   "password": "ElThomas123!",
//   "firstName": "Thomas",
//   "lastName": "Poupard",
//   "phoneNumber": "0623456789"
// }


export default function Login() {
  return (
    <CookiesProvider>
      <LoginLayout/>
    </CookiesProvider>
  )
}
