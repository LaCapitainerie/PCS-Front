import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { PhoneInput } from "../phone-input";

import * as React from "react";
import { User } from "@/type/User";
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Service } from "@/type/Service";
import { Prestation } from "@/type/Prestation";
import { Property } from "@/type/Property";
import { ReservationCommand } from "@/type/ReservationCommand";

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

interface ReservationCommandProps {
	stripeId: string;
	quantity: number;
	tokenUser: string;
	reservationCommand: ReservationCommand;
}

async function Submit({stripeId, quantity, tokenUser, reservationCommand}: ReservationCommandProps) {
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
        }

    }
    await onSubmit()
}

export function FormPanel({user, prestations, property}: {user: User, prestations: Service[], property: Property}) {

	const [value, setValue] = React.useState<Option[]>([]);

	const OPTIONS: Option[] = prestations.map((prestation) => {
		return {
			label: prestation.name,
			value: prestation.id
		}
	});

	console.log(OPTIONS);

	return (
		<form className="flex flex-col gap-5 w-[360px]">
			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="name">Votre Nom *</Label>
				<Input id="name" defaultValue={`${user.firstName} ${user.lastName}`} />
			</div>
			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="email">Addresse Email *</Label>
				<Input id="email" type="email" defaultValue={user.mail} />
			</div>
			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="phone">Numéro de tel *</Label>
				<PhoneInput id="phone" defaultValue={user.phoneNumber}/>
			</div>
			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="email">Notes supplémentaires</Label>
				<Textarea
					id="notes"
					placeholder="Ajouter un commentaire..."
				/>
			</div>

			<MultipleSelector
				value={value}
				onChange={setValue}
				defaultOptions={OPTIONS}
				placeholder="Select frameworks you like..."
				emptyIndicator={
				<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
					no results found.
				</p>
				}
			/>
			
			<p className="text-gray-11 text-xs my-4">
				En continuant, vous acceptez nos {" "}
				<span className="text-gray-12">Termes</span> et{" "}
				<span className="text-gray-12">Condition d'utilisation</span>.
			</p>
			<div className="flex justify-end gap-2">
				<Button type="button" onClick={_=>Submit(
					{
						stripeId: property.idStripe,
						quantity: quantity,
						tokenUser: user.token || "",
						reservationCommand: {
							travelerId: user.id,
							propertyId: property.id,
							beginDate: "2024-09-28T00:00:00Z",
							endDate: "2024-09-30T00:00:00Z",
							service: prestations.filter(prestation => value.map(v => v.value).includes(prestation.id)),
						} as ReservationCommand
					}
				)}>
					Payer
				</Button>
			</div>
		</form>
	);
}
