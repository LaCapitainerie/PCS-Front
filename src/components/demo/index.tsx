"use client";

import { Calendar } from "@/components/calendar";

import {
	CalendarDate,
	getLocalTimeZone,
	getWeeksInMonth,
	today,
} from "@internationalized/date";
import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { FormPanel } from "./form-panel";
import { Property } from "@/type/Property";
import { Reservation, ReservationDTO } from "@/type/Reservation";
import { User } from "@/type/User";
import { TakenValues } from "../calendar/calendar-grid";
import { Button } from "../ui/button";
import { Service } from "@/type/Service";



interface CalendarProps {
	property: Property;
	user: User;
	prestations: Service[];
	reservations: Reservation[];
}

function Search(): [string | null, string | null] {
    
	const searchParams = useSearchParams();
	const dateParam = searchParams.get("date");
	const slotParam = searchParams.get("slot");

	return [dateParam, slotParam];
}

export default function CalendarLayout({property, user, prestations, reservations}: CalendarProps) {

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

	return (
		<div className="flex flex-col xl:flex-row justify-around gap-8">
			<Calendar
				minValue={today(getLocalTimeZone()).add({ days: 1 })}
				defaultValue={today(getLocalTimeZone()).add({ days: 1 })}
				value={date}
				onChange={() => {}}
				onFocusChange={() => {}}
				TakenValues={
					reservations.map((reservation, index) => {
						
						const beginDate = new Date(reservation.beginDate);
						const endDate = new Date(reservation.endDate);

						return getDaysArray(beginDate, endDate, colors[index % colors.length]);
					})
				}
				mode={user.id === property.userId ? "lessor" : "traveler"}
			/>
			<FormPanel user={user} prestations={prestations} property={property}/>
		</div>
	);
}
