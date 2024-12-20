import { Temporal } from '@js-temporal/polyfill'
import { Course } from '@prisma/client'

const CalendarDayCell = ({
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
			{dayCourses.length === 0 && (
				<p className='text-xs mt-2 text-gray-500 dark:text-gray-400'>
					No events
				</p>
			)}
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

export default CalendarDayCell
