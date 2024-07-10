import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import * as React from "react";
import { User } from "@/type/User";
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Service } from "@/type/Service";
import { Property } from "@/type/Property";
import { ReservationCommand } from "@/type/ReservationCommand";
import { LoadingButton } from '@/components/ui/loading-button';
import { toast } from "../ui/use-toast";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

// nombre de jour
const quantity= 3;

interface ReservationCommandProps {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
	stripeId: string;
	quantity: number;
	tokenUser: string;
	reservationCommand: ReservationCommand;
}

async function Submit({setLoading, stripeId, quantity, tokenUser, reservationCommand}: ReservationCommandProps) {
    async function onSubmit() {

		setLoading(true);

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
				setLoading(false);
                throw new Error('La requête a échoué');
            }

            const data = await response.json();

            window.location.href = data.url;
        } catch (error) {
			setLoading(false);
            console.error('Erreur lors de la requête:', error);
			toast({
                title: "Erreur lors de la validation du paiement",
                description: "Veuillez réessayer plus tard",
            })
        }

    }
	setLoading(false);
    await onSubmit()
}

export function FormPanel({user, date, prestations, property}: {user: User, date: CalendarDate, prestations: Service[], property: Property}) {
	
	const [value, setValue] = React.useState<Option[]>([]);
	const [loading, setLoading] = React.useState(false);

	const OPTIONS: Option[] = prestations.map((prestation) => {
		return {
			label: prestation.name,
			value: prestation.id
		}
	});

	const [duree, setDuree] = React.useState(1);

	console.log(property);
	

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
				<Input id="phone" type="tel" defaultValue={user.phoneNumber} contrains="tel"/>
			</div>
			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="duree">Duree</Label>
				<Input id="duree" type="number" defaultValue={1} onChange={(e) => setDuree(e.target.valueAsNumber)}/>
			</div>



			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="services">Services</Label>
				<MultipleSelector
					options={OPTIONS}
					value={value}
					onChange={(value) => setValue(value)}
				/>

			</div>
			<p className="text-gray-11 text-xs my-4">
				En continuant, vous acceptez nos {" "}
				<span className="text-gray-12">Termes</span> et{" "}
				<span className="text-gray-12">Condition d&apos;utilisation</span>.
			</p>
			<div className="flex justify-end gap-2">
				
				<LoadingButton loading={loading} onClick={_=>Submit(
					{
						setLoading,
						stripeId: property.idStripe,
						quantity: duree,
						tokenUser: user.token || "",
						reservationCommand: {
							travelerId: user.id,
							propertyId: property.id,
							beginDate: date.toDate(getLocalTimeZone()).toISOString(),
							endDate: date.add({ days: duree }).toDate(getLocalTimeZone()).toISOString(),
							service: prestations.filter(
								prestation => value.map(v => v.value).includes(prestation.id)
							).map(prestation => {
								return {
									...prestation,
									userId: user.id,
									date: date.toDate(getLocalTimeZone()).toISOString()
								}
							})
						} as ReservationCommand
					}
				)}>
					Payer
				</LoadingButton>
			</div>
		</form>
	);
}
