"use client";

import { useState } from "react";
import { cookies } from 'next/headers'
import {Cookie} from "undici-types";

const accountSid = `${process.env.NEXT_PUBLIC_TWILIO_ACCOUNT}`;
const authToken = `${process.env.NEXT_PUBLIC_ICON_URL}`;
const client = require('twilio')(accountSid, authToken);
interface OTPComponentProps {
    headers: Headers;
    cookie: Cookie;
}

const OTPComponent: React.FC<OTPComponentProps> = ({ headers, cookie }) => {
    //TODO: Attention, j'ai changé les cookies
    const [otpR, setOtpR] = useState<boolean>(false);

    const sendOTP = () => {
        console.log("otp sent");
        client.verify.v2.services("VA7335d9a3795f7c0a2bab43ea99088719")
            .verifications
            .create({ to: '+330623000147', channel: 'sms' })
            .then((verification: { sid: any; }) => {
                cookies().set('otp', verification.sid, {path: '/', expires: new Date(Date.now() + 300)});
/*                setCookie('otp', verification.sid, { path: '/', expires: new Date(Date.now() + 300) });*/
            });
    };

    const verifyOTP = (otp: string): boolean => {
        const cookiesStore = cookies();
        const otpSid = cookiesStore.get('otp');
        client.verify
            .services("VA7335d9a3795f7c0a2bab43ea99088719")
            .verificationChecks
            .create({ to: '+330623000147', code: otp, verificationSid: otpSid })
            .then((verification_check: any) => {
                console.log(verification_check.status);
                setOtpR(verification_check.status === 'approved');
            });

        return otpR;
    };

    return (
        <div>
            <button onClick={sendOTP}>Send OTP</button>
            <button onClick={() => verifyOTP("123456")}>Verify OTP</button>
            {otpR ? <p>OTP Verified</p> : <p>OTP Not Verified</p>}
        </div>
    );
};

export default OTPComponent;
