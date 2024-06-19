"use client"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLocale } from "@react-aria/i18n";
import { CalendarIcon, Clock4, KeyRound } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { timeZones } from "./time-zones";
import { Reservation } from "@/type/Reservation";
import { Property } from "@/type/Property";
import { useState } from "react";

export function LeftPanel({
	Reservations,
	showForm,
	timeZone,
	setTimeZone,
}: {
	Reservations: Reservation[];
	showForm: boolean | null;
	timeZone: string;
	setTimeZone: (timeZone: string) => void;
}) {
	const { locale } = useLocale();

	const searchParams = useSearchParams();
	const slotParam = searchParams.get("slot");


	const [reservation, setReservation] = useState<Reservation | undefined>(undefined);

	return (
		<div className="flex flex-col gap-4 w-[280px] border-r pr-6">
			<div className="grid gap-1">
				<p className="text-gray-11 text-sm font-semibold">Reservation :</p>
			</div>
			<div className="grid gap-3">
				<p className="text-gray-12 text-2xl font-bold">John.Doe</p>
				{showForm && (
					<div className="flex text-gray-12">
						<CalendarIcon className="size-4 mr-2" />
						<div className="flex flex-col text-sm font-semibold">
							<p>
								{new Date(slotParam as string).toLocaleString(locale, {
									dateStyle: "full",
								})}
							</p>
							<p>
								{new Date(slotParam as string).toLocaleString(locale, {
									timeStyle: "short",
								})}
							</p>
						</div>
					</div>
				)}
				<div className="flex items-center text-gray-12">
					<Clock4 className="size-4 mr-2" />
					<p className="text-sm font-semibold">12:00</p>
				</div>
				<div className="flex items-center text-gray-12">
					<KeyRound className="size-4 mr-2" />
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<p className="text-sm font-semibold">Conciergerie</p>
							</TooltipTrigger>
							<TooltipContent>Conciergerie</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				{/* <Select value={timeZone} onValueChange={setTimeZone}>
					<SelectTrigger className="w-fit">
						<SelectValue placeholder="Select time zone">
							{timeZone.replace(/_/g, " ").split("(")[0].trim()}
						</SelectValue>
					</SelectTrigger>
					<SelectContent className="w-fit dark:bg-gray-5">
						{timeZones.map((timeZone) => (
							<SelectItem
								key={timeZone.label}
								value={timeZone.tzCode}
								className="dark:focus:bg-gray-2"
							>
								{timeZone.label.replace(/_/g, " ")}
							</SelectItem>
						))}
					</SelectContent>
				</Select> */}
				<Select value={timeZone} onValueChange={(e) => setReservation(Reservations.find((r) => r.travelerId === e))} disabled={Reservations.length == 0}>
					<SelectTrigger className="w-fit">
						<SelectValue placeholder="Select a Property">
							{Reservations.length == 0 ? "No reservation on this day" : "Select a Property"}
						</SelectValue>
					</SelectTrigger>
					<SelectContent className="w-fit dark:bg-gray-5">
						{Reservations.map((res, index) => (
							<SelectItem
								key={index}
								value={res.travelerId}
								className="dark:focus:bg-gray-2"
							>
								{res.travelerId}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
