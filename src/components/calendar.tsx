'use client'
import { Temporal } from '@js-temporal/polyfill'
import { Course } from '@prisma/client'
import { useEffect, useState } from 'react'
import SidePanel from './SidePanel'

interface CalendarProps {
	courses: Course[]
}

const CalendarHeader = ({
	year,
	month,
	next,
	previous,
}: {
	year: number
	month: number
	next: () => void
	previous: () => void
}) => (
	<div className='p-4 border-b dark:border-gray-700'>
		<div className='flex items-center justify-between'>
			<h1 className='text-2xl font-bold dark:text-white'>
				{Temporal.PlainDate.from({ year, month, day: 1 }).toLocaleString('en', {
					month: 'long',
					year: 'numeric',
				})}
			</h1>
			<div className='flex gap-2'>
				<button
					onClick={previous}
					className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
				>
					Previous
				</button>
				<button
					onClick={next}
					className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
				>
					Next
				</button>
			</div>
		</div>
	</div>
)

const DayCell = ({
	day,
	today,
	courses,
	onClick,
}: {
	day: { date: Temporal.PlainDate; isInMonth: boolean }
	today: Temporal.PlainDate
	courses: Course[]
	onClick: (date: Temporal.PlainDate) => void
}) => {
	const isToday = day.date.equals(today)
	const dayCourses = courses.filter((course) =>
		Temporal.PlainDate.from(
			new Date(course.date).toISOString().split('T')[0]
		).equals(day.date)
	)

	return (
		<div
			onClick={() => onClick(day.date)}
			className={`
				border-b border-r dark:border-gray-700 p-2 relative group cursor-pointer
				${day.isInMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}
				${isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}
				hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
			`}
		>
			<span
				className={`
					text-sm font-medium
					${
						day.isInMonth
							? 'text-gray-900 dark:text-gray-200'
							: 'text-gray-400 dark:text-gray-600'
					}
					${isToday ? 'text-blue-600 dark:text-blue-400' : ''}
				`}
			>
				{day.date.day}
			</span>
			{dayCourses.slice(0, 2).map((course) => (
				<div
					key={course.id}
					className='flex justify-between mt-2 rounded p-2 bg-blue-100 dark:bg-blue-800'
				>
					<div>
						<h2 className='text-xs font-semibold'>{course.title}</h2>
						<p className='text-xs'>{course.professor}</p>
					</div>
					<div>
						<p className='text-xs'>{course.classroom}</p>
					</div>
				</div>
			))}
			{dayCourses.length > 2 && (
				<div className='relative'>
					<p className='text-xs mt-2 text-gray-500 dark:text-gray-400'>
						+ {dayCourses.length - 2} more course{dayCourses.length > 3 && 's'}
					</p>
					<div className='absolute left-0 top-full mt-2 w-64 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg z-10 hidden group-hover:block overflow-y-auto'>
						{dayCourses.slice(2).map((course) => (
							<div
								key={course.id}
								className='flex justify-between mt-2 rounded p-2 bg-blue-100 dark:bg-blue-800'
							>
								<div>
									<h2 className='text-xs font-semibold'>{course.title}</h2>
									<p className='text-xs'>{course.professor}</p>
								</div>
								<div>
									<p className='text-xs'>{course.classroom}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

const CalendarGrid = ({
	monthCalendar,
	today,
	courses,
	onDayClick,
}: {
	monthCalendar: { date: Temporal.PlainDate; isInMonth: boolean }[]
	today: Temporal.PlainDate
	courses: Course[]
	onDayClick: (date: Temporal.PlainDate) => void
}) => (
	<div className='flex-1 grid grid-cols-7 grid-rows-6'>
		{monthCalendar.map((day, idx) => (
			<DayCell
				key={idx}
				day={day}
				today={today}
				courses={courses}
				onClick={onDayClick}
			/>
		))}
	</div>
)

const Calendar = ({ courses }: CalendarProps) => {
	const [month, setMonth] = useState(Temporal.Now.plainDateISO().month)
	const [year, setYear] = useState(Temporal.Now.plainDateISO().year)
	const [monthCalendar, setMonthCalendar] = useState<
		{ date: Temporal.PlainDate; isInMonth: boolean }[]
	>([])
	const [selectedDay, setSelectedDay] = useState<Temporal.PlainDate | null>(
		null
	)

	const today = Temporal.Now.plainDateISO()

	const next = () => {
		const { month: nextMonth, year: nextYear } = Temporal.PlainYearMonth.from({
			month,
			year,
		}).add({ months: 1 })
		setMonth(nextMonth)
		setYear(nextYear)
	}

	const previous = () => {
		const { month: prevMonth, year: prevYear } = Temporal.PlainYearMonth.from({
			month,
			year,
		}).subtract({ months: 1 })
		setMonth(prevMonth)
		setYear(prevYear)
	}

	useEffect(() => {
		const fiveWeeks = 5 * 7
		const sixWeeks = 6 * 7
		const startOfMonth = Temporal.PlainDate.from({ year, month, day: 1 })
		const monthLength = startOfMonth.daysInMonth
		const dayOfWeekMonthStartedOn = startOfMonth.dayOfWeek - 1
		const length =
			dayOfWeekMonthStartedOn + monthLength > fiveWeeks ? sixWeeks : fiveWeeks

		const calendar = new Array(length).fill({}).map((_, index) => {
			const date = startOfMonth.add({
				days: index - dayOfWeekMonthStartedOn,
			})
			return {
				isInMonth: !(
					index < dayOfWeekMonthStartedOn ||
					index - dayOfWeekMonthStartedOn >= monthLength
				),
				date,
			}
		})

		setMonthCalendar(calendar)
	}, [year, month])

	const handleDayClick = (date: Temporal.PlainDate) => {
		setSelectedDay(date)
	}

	return (
		<div className='h-full flex flex-col bg-white dark:bg-gray-900'>
			<CalendarHeader
				year={year}
				month={month}
				next={next}
				previous={previous}
			/>
			<div className='flex-1 flex flex-col'>
				<div className='grid grid-cols-7 border-b dark:border-gray-700'>
					{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
						<div
							key={day}
							className='p-4 text-sm font-semibold text-center dark:text-gray-200'
						>
							{day}
						</div>
					))}
				</div>
				<CalendarGrid
					monthCalendar={monthCalendar}
					today={today}
					courses={courses}
					onDayClick={handleDayClick}
				/>
			</div>
			<SidePanel
				selectedDay={selectedDay}
				courses={courses}
				onClose={() => setSelectedDay(null)}
			/>
		</div>
	)
}

export default Calendar
