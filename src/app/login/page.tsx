"use client"

import LoginLayout from "@/components/CustomComponent/layout/LoginLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

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
    <LoginLayout/>
  )
}
