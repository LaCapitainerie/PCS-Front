"use client"

import { useCookies } from "next-client-cookies";
import { useState } from "react";

const accountSid = `${process.env.NEXT_PUBLIC_TWILIO_ACCOUNT}`;
const authToken = `${process.env.NEXT_PUBLIC_ICON_URL}`;
const client = require('twilio')(accountSid, authToken);

export default function sendOTP() {

    console.log("otp sent");


    const cookies = useCookies();

    client.verify.v2.services("VA7335d9a3795f7c0a2bab43ea99088719")
        .verifications
        .create({ to: '+330623000147', channel: 'sms' })
        .then((verification: { sid: any; }) => cookies.set('otp', verification.sid, { path: '/', expires: new Date(Date.now() + 300) }));

}

function verifyOTP(otp: string) : boolean {

    const cookies = useCookies();
    const otpSid = cookies.get('otp');

    const [otpR, setOtpR] = useState<boolean>(false);

    client.verify
        .services("VA7335d9a3795f7c0a2bab43ea99088719")
        .verificationChecks
        .create({ to: '+330623000147', code: otp, verificationSid: otpSid })
        .then((verification_check: any) => {console.log(verification_check.status); setOtpR(verification_check.status === 'approved')});


    return otpR;
}