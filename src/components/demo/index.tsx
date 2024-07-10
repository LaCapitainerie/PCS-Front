"use client";

import { Calendar } from "@/components/calendar";

import {
	getLocalTimeZone,
	today,
} from "@internationalized/date";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { FormPanel } from "./form-panel";
import { Property } from "@/type/Property";
import { Reservation } from "@/type/Reservation";
import { User } from "@/type/User";
import { TakenValues } from "../calendar/calendar-grid";
import { Service } from "@/type/Service";



interface CalendarProps {
	property: Property | null;
	user: User;
	prestations: Service[] | null;
	reservations: Reservation[];
	mode?: "lessor" | "traveler";
}

function Search(): [string | null, string | null] {
    
	const searchParams = useSearchParams();
	const dateParam = searchParams.get("date");
	const slotParam = searchParams.get("slot");

	return [dateParam, slotParam];
}

export default function CalendarLayout({property, user, prestations, reservations, mode}: CalendarProps) {

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

	return (
		<div className="flex flex-col xl:flex-row justify-around gap-8">
			<Calendar
				minValue={today(getLocalTimeZone()).add({ days: 1 })}
				defaultValue={today(getLocalTimeZone()).add({ days: 1 })}
				value={date}
				onChange={_ => _}
				onFocusChange={_ => _}
				TakenValues={
					reservations.map((reservation, index) => {
						
						const beginDate = new Date(reservation.beginDate);
						const endDate = new Date(reservation.endDate);

						return getDaysArray(beginDate, endDate, colors[index % colors.length]);
					})
				}
				mode={finalmode}
			/>
		</div>
	);
}
