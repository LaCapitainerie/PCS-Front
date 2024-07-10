"use client";

import { Calendar } from "@/components/calendar";

import {
	getLocalTimeZone,
	today,
} from "@internationalized/date";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { FormPanel } from "@/components/demo/form-panel";
import { Property } from "@/type/Property";
import { Reservation } from "@/type/Reservation";
import { User } from "@/type/User";
import { TakenValues } from "@/components/calendar/calendar-grid";
import { Service } from "@/type/Service";
import { useEffect } from "react";
import { set } from "date-fns";



interface CalendarProps {
	property: Property | null;
	user: User;
	prestations: Service[] | null;
	reservations: Reservation[];
	mode?: "lessor" | "traveler";
	setReservation: React.Dispatch<React.SetStateAction<Reservation["id"]>>;
}

function Search(): [string | null, string | null] {
    
	const searchParams = useSearchParams();
	const dateParam = searchParams.get("date");
	const slotParam = searchParams.get("slot");

	return [dateParam, slotParam];
}

export default function CalendarLayout({property, user, prestations, reservations, mode, setReservation}: CalendarProps) {

	const [date, setDate] = React.useState(today(getLocalTimeZone()));
	
	const getDaysArray = function(start: Date, end: Date, color: typeof colors[number]) {
		const arr: TakenValues[] = [];
		for(const dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
			arr.push({
				day: dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate(),
				color: color
			});
		}
		return arr;
	};

	const colors = [
		"#264653",
		"#2a9d8f",
		"#e9c46a",
		"#f4a261",
		"#e76f51",
	]

	const finalmode = mode ?? (user.id === property?.userId ? "lessor" : "traveler")

	console.log(reservations);

	const [dateV, setDateV] = React.useState(today(getLocalTimeZone()));
	
	useEffect(() => {
		// Loop through every reservations and check if the date is in the range
		// If it is, setReservation to the reservation id

		const found = reservations.find((reservation) => {
			const beginDate = new Date(reservation.beginDate).setHours(0, 0, 0, 0);
			const endDate = new Date(reservation.endDate).setHours(0, 0, 0, 0);
			const toDate = dateV.toDate(getLocalTimeZone()).setHours(0, 0, 0, 0);

			console.log(beginDate, endDate, toDate);
			

			return toDate >= beginDate && toDate <= endDate;
		});

		setReservation(found?.id ?? "");

	}, [dateV]);

	return (
		<div className="flex flex-col xl:flex-row justify-around gap-8">
			<Calendar
				minValue={today(getLocalTimeZone()).add({ days: 1 })}
				defaultValue={today(getLocalTimeZone()).add({ days: 1 })}
				value={date}
				onChange={_ => _}
				onFocusChange={setDateV}
				TakenValues={
					reservations.map((reservation, index) => {
						
						const beginDate = new Date(reservation.beginDate);
						const endDate = new Date(reservation.endDate);

						return getDaysArray(beginDate, endDate, colors[index % colors.length]);
					})
				}
				mode={finalmode}
			/>
			{finalmode == "traveler" ? <FormPanel user={user} prestations={prestations || []} property={property || {} as Property}/> : ""}
		</div>
	);
}
