'use client'

import React, {useState, useEffect, FormEvent} from "react";
import {ReservationCommand} from "@/type/ReservationCommand";
import {Prestation} from "@/type/Prestation";
import { toast } from "@/components/ui/use-toast";

// id stripe de l'objet (récupérable dorénavant en fetchant la propriété/prestatio)
const stripeId = "price_1POo7DRrur5y60csjVWpmM34";
// nombre de jour
const quantity= 3;
// Token de l'utilisateur (Obligatoirement un traveler dans le contexte de la requête)
const tokenUser: string = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI1ZmIzYjVjZS04NGUxLTQzZjAtODkwZi0zNjMyZGJiMmQ3NDEiLCJleHAiOjE3NDkyNTgwMTF9.qa9Ln5WkVnAf4_CQdjTP7OL0X6AqThjaYr3-dK67Ry8lgAOovc1PPY_0GhX_i-l0i_R9LIOZbM_NVgjnpqGsBA"
let serviceA = {
    id: "6fe75cbd-f288-4b8e-9922-a8d0dc40e9ad",
    date: "2024-09-29T00:00:00Z",
    quantity: 1,
    price: 65
} as unknown as Prestation;

const reservationCommand = {
    travelerId: "5fb3b5ce-84e1-43f0-890f-3632dbb2d741",
    propertyId: "15e31706-4201-49ed-b808-69e353c20632",
    beginDate: "2024-09-28T00:00:00Z",
    endDate: "2024-09-30T00:00:00Z",
    service : [
        serviceA
    ]
} as unknown as ReservationCommand;

async function Submit() {
    async function onSubmit() {
        // IMPORTANT les deux paramètres dans le lien de la requête sont obligatoire, sinon erreur
        const link= `${process.env.NEXT_PUBLIC_API_URL}/reservation/checkout/session/${stripeId}/${quantity}`
        try {
            const response = await fetch(link, {
                method: 'POST',
                headers: {
                    'Authorization': `${tokenUser}`,
                },
                body: JSON.stringify(reservationCommand)
            });

            if (!response.ok) {
                throw new Error('La requête a échoué');
            }

            const data = await response.json();

            window.location.href = data.url;
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            toast({
                title: "Erreur lors de la validation du paiement",
                description: "Veuillez réessayer plus tard",
            })
        }

    }
    await onSubmit()
}

const ProductDisplay = () => (
    <section>
        <div className="product">
            <img
                src="https://i.imgur.com/EHyR2nP.png"
                alt="The cover of Stubborn Attachments"
            />
            <div className="description">
                <h3>Petite maison</h3>
                <h5>65.00€</h5>
            </div>
        </div>
        <button type="submit" onClick={Submit}>
            Checkout
        </button>
    </section>
);

const Message = ({message}: {message: string}) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function App() {
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return message ? (
        <Message message={message} />
    ) : (
        <ProductDisplay />
    );
}