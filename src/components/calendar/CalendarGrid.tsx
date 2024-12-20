import { Temporal } from '@js-temporal/polyfill'
import { Course } from '@prisma/client'
import CalendarDayCell from './CalendarDayCell'

const CalendarGrid = ({
	calendar,
	today,
	courses,
	onDayClick,
	format,
}: {
	calendar: { date: Temporal.PlainDate; isInMonth: boolean }[]
	today: Temporal.PlainDate
	courses: Course[]
	onDayClick: (date: Temporal.PlainDate) => void
	format: string
}) => {
	const getGridClasses = () => {
		switch (format) {
			case 'day':
				return 'grid-cols-1 grid-rows-1'
			case 'week':
				return 'grid-cols-7 grid-rows-1'
			case 'month':
			default:
				return 'grid-cols-7 grid-rows-6'
		}
	}

	return (
		<div className={`flex-1 grid ${getGridClasses()}`}>
			{calendar.map((day, idx) => (
				<CalendarDayCell
					key={idx}
					day={day}
					today={today}
					courses={courses}
					onClick={onDayClick}
				/>
			))}
		</div>
	)
}

export default CalendarGrid
