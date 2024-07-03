import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhoneInput } from "../phone-input";

import * as React from "react";
import { User } from "@/type/User";
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Service } from "@/type/Service";

type Guest = {
	email: string;
};

export function FormPanel({user, prestations}: {user: User, prestations: Service[]}) {
	const router = useRouter();

	const [value, setValue] = React.useState<Option[]>([]);

	const OPTIONS: Option[] = prestations.map((prestation) => {
		return {
			label: prestation.name,
			value: prestation.id
		}
	});

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
				placeholder="Choisir les prestations..."
				emptyIndicator={
				<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
					aucun résultat trouvé.
				</p>
				}
			/>
			
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
