import { useState } from "react"
import "./Calendar.css"

type CalendarProps = {
	onSelectDate?: (date: Date) => void
}

export default function Calendar({ onSelectDate }: CalendarProps) {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

	const y = currentDate.getFullYear()
	const m = currentDate.getMonth()

	const firstDay = new Date(y, m, 1).getDay()
	const monthDays = new Date(y, m + 1, 0).getDate()

	const weeks: (number | null)[][] = []
	let week: (number | null)[] = []

	for (let i = 0; i < firstDay; ++i) week.push(null)
	for (let day = 1; day <= monthDays; day++) {
		week.push(day)
		if (week.length === 7) {
			weeks.push(week)
			week = []
		}
	}
	if (week.length > 0) {
		while (week.length < 7) week.push(null)
		weeks.push(week)
	}

	const pMonth = () => setCurrentDate(new Date(y, m - 1, 1))
	const nMonth = () => setCurrentDate(new Date(y, m + 1, 1))

	const today = new Date()

	const isToday = (d: number) =>
		today.getDate() === d && today.getMonth() === m && today.getFullYear() === y

	const isPast = (d: number) => {
		const date = new Date(y, m, d)
		return date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
	}

	return (
		<div className="calendar">
			<div className="calendar-header">
				<button onClick={pMonth}>←</button>
				<h2>
					{currentDate.toLocaleString("pt-BR", { month: "long" })
						.replace(/^\p{L}/u, c => c.toUpperCase())} {y}
				</h2>
				<button onClick={nMonth}>→</button>
			</div>

			<div className="calendar-weekdays">
				{["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
					<div key={i}>{d}</div>
				))}
			</div>

			<div className="calendar-grid">
				{weeks.map((week, i) =>
					week.map((day, j) =>
						day ? (
							isPast(day) ? (
								<button key={`${i}-${j}`} className="calendar-day past" tabIndex={-1}>
									{day}
								</button>
							) : (
								<button
									key={`${i}-${j}`}
									className={[
										"calendar-day",
										isToday(day) ? "today" : "",
										selectedDate &&
										selectedDate.getDate() === day &&
										selectedDate.getMonth() === m &&
										selectedDate.getFullYear() === y
											? "selected"
											: "",
									].join(" ")}
									onClick={() => {
										const d = new Date(y, m, day)
										setSelectedDate(d)
										onSelectDate?.(d)
									}}
								>
									{day}
								</button>
							)
						) : (
							<div key={`${i}-${j}`} className="calendar-empty" tabIndex={-1}></div>
						)
					)
				)}
			</div>
		</div>
	)
}

