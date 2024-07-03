import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { UserPlus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhoneInput } from "../phone-input";

import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { User } from "@/type/User";

type Guest = {
	email: string;
};

export function FormPanel({user}: {user: User}) {
	const router = useRouter();

	const [guests, setGuests] = React.useState<Guest[]>([]);

	const addGuest = () => {
		setGuests([...guests, { email: "" }]);
	};

	const removeGuest = (index: number) => {
		setGuests(guests.filter((_, i) => i !== index));
	};

	const handleChange = (index: number, email: string) => {
		setGuests(guests.map((guest, i) => (i === index ? { email } : guest)));
	};

	const hasGuests = guests.length > 0;

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
			{hasGuests && (
				<>
					<Label htmlFor="email">Ajouter un prestataire</Label>
					<div className="flex flex-col gap-1">
						{guests.map((guest, index) => (
							<div key={index} className="flex items-center space-x-2 relative">
								<Input
									id="guest"
									type="email"
									placeholder="Email"
									value={guest.email}
									onChange={(e) => handleChange(index, e.target.value)}
								/>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<X
												className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 size-4"
												onClick={() => removeGuest(index)}
											/>
										</TooltipTrigger>
										<TooltipContent>Retirer l'email</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						))}
					</div>
				</>
			)}
			<Button
				type="button"
				variant="ghost"
				onClick={() => addGuest()}
				className="w-fit"
			>
				<UserPlus className="mr-2 size-4" />
				Ajouter un prestataire
			</Button>
			<p className="text-gray-11 text-xs my-4">
				En continuant, vous acceptez nos {" "}
				<span className="text-gray-12">Termes</span> et{" "}
				<span className="text-gray-12">Condition d'utilisation</span>.
			</p>
			<div className="flex justify-end gap-2">
				<Button
					variant="ghost"
					onClick={() => {
						router.back();
					}}
				>
					Retour
				</Button>
				<Button asChild type="button">
					<Link href="https://github.com/damianricobelli/shadcn-cal-com">
						Continuer
					</Link>
				</Button>
			</div>
		</form>
	);
}
