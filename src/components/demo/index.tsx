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
import { LeftPanel } from "./left-panel";
import { RightPanel } from "./right-panel";
import { Prestation, PrestationDTO } from "@/type/Prestation";
import { Property } from "@/type/Property";
import { Bill, Reservation, ReservationDTO } from "@/type/Reservation";
import { User } from "@/type/User";
import { TakenValues } from "../calendar/calendar-grid";
import { Service } from "@/type/Service";



interface CalendarProps {
	property: Property;
	token: User["token"];
	mode: "lessor" | "traveler";
}

function Search(): [string | null, string | null] {
    
	const searchParams = useSearchParams();
	const dateParam = searchParams.get("date");
	const slotParam = searchParams.get("slot");

	return [dateParam, slotParam];
}

export default function CalendarLayout({property, token, mode}: CalendarProps) {
	const router = useRouter();
	const { locale } = useLocale();

	const [timeZone, setTimeZone] = React.useState("UTC");
	const [date, setDate] = React.useState(today(getLocalTimeZone()));
	const [focusedDate, setFocusedDate] = React.useState<CalendarDate | null>(
		date,
	);

	const weeksInMonth = getWeeksInMonth(focusedDate as DateValue, locale);

	const [selectedReservation, setSelectedReservation] = React.useState<Reservation[]>([]);
	const [allReservations, setAllReservations] = React.useState<Reservation[]>([]);

	// Get list of all reservations with fetch
	React.useEffect(() => {
        const dataFetch = async () => {
			if (property.id === undefined) {
				setAllReservations([]);
				return;
			};

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/reservation/property/allreservation/${property.id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": token || "",
					},
				}
			)

			if (!response.ok) {
				setAllReservations([]);
				return;
			};

			const data: ReservationDTO = await (response).json();

			setAllReservations(
				data.reservation);
        };

        dataFetch();
    }, [property]);



	const handleChangeDate = (date: DateValue) => {
		setDate(date as CalendarDate);
		// const url = new URL(window.location.href);
		// url.searchParams.set(
		// 	"date",
		// 	date.toDate(timeZone).toISOString().split("T")[0],
		// );
		// router.push(url.toString());

		setSelectedReservation(
			// If the date is between the beginDate and endDate of a reservation, we add it to the selectedReservation
			allReservations.filter((reservation) => {
				const beginDate = new Date(reservation.beginDate);
				const endDate = new Date(reservation.endDate);
				const currentDate = date.toDate(timeZone);

				return currentDate >= beginDate && currentDate <= endDate;
			})
		);
	};



	const handleChangeAvailableTime = (time: string) => {
		const timeValue = time.split(":").join(" ");

		const match = timeValue.match(/^(\d{1,2}) (\d{2})([ap]m)?$/i);
		if (!match) {
			console.error("Invalid time format");
			return null;
		}

		let hours = Number.parseInt(match[1]);
		const minutes = Number.parseInt(match[2]);
		const isPM = match[3] && match[3].toLowerCase() === "pm";

		if (isPM && (hours < 1 || hours > 12)) {
			console.error("Time out of range (1-12) in 12-hour format");
			return null;
		}

		if (isPM && hours !== 12) {
			hours += 12;
		} else if (!isPM && hours === 12) {
			hours = 0;
		}

		const currentDate = date.toDate(timeZone);
		currentDate.setHours(hours, minutes);

		// const url = new URL(window.location.href);
		// url.searchParams.set("slot", currentDate.toISOString());
		// router.push(url.toString());
	};

	
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
		<div className="w-full px-8 py-6 rounded-md max-w-max mx-auto">
			<div className="flex gap-6">
				{mode == "lessor" ? <LeftPanel
					Reservations={selectedReservation}
					timeZone={timeZone}
					setTimeZone={setTimeZone}
				/> : null}
				{true ? (
					<>
						<Calendar
							minValue={today(getLocalTimeZone()).add({ days: 1 })}
							defaultValue={today(getLocalTimeZone()).add({ days: 1 })}
							value={date}
							onChange={handleChangeDate}
							onFocusChange={(focused) => setFocusedDate(focused)}
							TakenValues={
								allReservations.map((reservation, index) => {
									
									const beginDate = new Date(reservation.beginDate);
									const endDate = new Date(reservation.endDate);

									return getDaysArray(beginDate, endDate, colors[index % colors.length]);
								})
							}
							mode={mode}
						/>
						{/* <RightPanel
							{...{ date, timeZone, weeksInMonth, handleChangeAvailableTime }}
						/> */}
					</>
				) : (
					<FormPanel />
				)}
			</div>
		</div>
	);
}
