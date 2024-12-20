'use client'
import { Temporal } from '@js-temporal/polyfill'
import { Course } from '@prisma/client'
import { useEffect, useState } from 'react'
import {
	MdCalendarToday,
	MdChevronLeft,
	MdChevronRight,
	MdToday,
	MdViewWeek,
} from 'react-icons/md'
import CalendarGrid from './CalendarGrid'
import CalendarHeader from './CalendarHeader'

interface CalendarProps {
	courses: Course[]
}

const Calendar = ({ courses }: CalendarProps) => {
	const [month, setMonth] = useState(Temporal.Now.plainDateISO().month)
	const [year, setYear] = useState(Temporal.Now.plainDateISO().year)
	const [calendar, setCalendar] = useState<
		{ date: Temporal.PlainDate; isInMonth: boolean }[]
	>([])
	const [selectedDay, setSelectedDay] = useState<Temporal.PlainDate | null>(
		null
	)
	const [format, setFormat] = useState('month')

	const next = () => {
		switch (format) {
			case 'day':
				setSelectedDay((prev) => {
					const nextDay = prev
						? prev.add({ days: 1 })
						: Temporal.Now.plainDateISO().add({ days: 1 })
					setMonth(nextDay.month)
					setYear(nextDay.year)
					return nextDay
				})
				break
			case 'week':
				setSelectedDay((prev) => {
					const nextWeek = prev
						? prev.add({ days: 7 })
						: Temporal.Now.plainDateISO().add({ days: 7 })
					setMonth(nextWeek.month)
					setYear(nextWeek.year)
					return nextWeek
				})
				break
			case 'month':
			default:
				const { month: nextMonth, year: nextYear } =
					Temporal.PlainYearMonth.from({
						month,
						year,
					}).add({ months: 1 })
				setMonth(nextMonth)
				setYear(nextYear)
				break
		}
	}

	const previous = () => {
		switch (format) {
			case 'day':
				setSelectedDay((prev) => {
					const prevDay = prev
						? prev.subtract({ days: 1 })
						: Temporal.Now.plainDateISO().subtract({ days: 1 })
					setMonth(prevDay.month)
					setYear(prevDay.year)
					return prevDay
				})
				break
			case 'week':
				setSelectedDay((prev) => {
					const prevWeek = prev
						? prev.subtract({ days: 7 })
						: Temporal.Now.plainDateISO().subtract({ days: 7 })
					setMonth(prevWeek.month)
					setYear(prevWeek.year)
					return prevWeek
				})
				break
			case 'month':
			default:
				const { month: prevMonth, year: prevYear } =
					Temporal.PlainYearMonth.from({
						month,
						year,
					}).subtract({ months: 1 })
				setMonth(prevMonth)
				setYear(prevYear)
				break
		}
	}

	const changeFormat = (newFormat: string) => {
		setFormat(newFormat)
	}

	const goToToday = () => {
		const today = Temporal.Now.plainDateISO()
		setMonth(today.month)
		setYear(today.year)
		setSelectedDay(today)
	}

	useEffect(() => {
		const today = Temporal.Now.plainDateISO()
		const generateCalendar = () => {
			const startOfMonth = Temporal.PlainDate.from({ year, month, day: 1 })
			const startOfWeek = selectedDay
				? selectedDay.subtract({ days: selectedDay.dayOfWeek - 1 })
				: today.subtract({ days: today.dayOfWeek - 1 })
			const startOfDay = selectedDay || today

			switch (format) {
				case 'day':
					return [{ date: startOfDay, isInMonth: true }]
				case 'week':
					return new Array(7).fill({}).map((_, index) => {
						const date = startOfWeek.add({ days: index })
						return { date, isInMonth: true }
					})
				case 'month':
				default:
					const fiveWeeks = 5 * 7
					const sixWeeks = 6 * 7
					const monthLength = startOfMonth.daysInMonth
					const dayOfWeekMonthStartedOn = startOfMonth.dayOfWeek - 1
					const length =
						dayOfWeekMonthStartedOn + monthLength > fiveWeeks
							? sixWeeks
							: fiveWeeks

					return new Array(length).fill({}).map((_, index) => {
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
			}
		}

		setCalendar(generateCalendar())
	}, [year, month, format, selectedDay])

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
				changeFormat={changeFormat}
				goToToday={goToToday}
				icons={{
					previous: <MdChevronLeft className='w-5 h-5' />,
					next: <MdChevronRight className='w-5 h-5' />,
					today: <MdToday className='w-5 h-5' />,
					week: <MdViewWeek className='w-5 h-5' />,
					month: <MdCalendarToday className='w-5 h-5' />,
				}}
			/>
			<div className='flex-1 flex flex-col'>
				{format === 'month' && (
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
				)}
				<CalendarGrid
					calendar={calendar}
					today={Temporal.Now.plainDateISO()}
					courses={courses}
					onDayClick={handleDayClick}
					format={format}
				/>
			</div>
		</div>
	)
}

export default Calendar
