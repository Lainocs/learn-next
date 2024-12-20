import { Temporal } from '@js-temporal/polyfill'

const CalendarHeader = ({
	year,
	month,
	next,
	previous,
	changeFormat,
	goToToday,
	icons,
}: {
	year: number
	month: number
	next: () => void
	previous: () => void
	changeFormat: (format: string) => void
	goToToday: () => void
	icons: {
		previous: React.ReactNode
		next: React.ReactNode
		today: React.ReactNode
		week: React.ReactNode
		month: React.ReactNode
	}
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
					className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 flex items-center'
				>
					{icons.previous}
					<span>Previous</span>
				</button>
				<button
					onClick={next}
					className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 flex items-center'
				>
					<span>Next</span>
					{icons.next}
				</button>
				<button
					onClick={() => changeFormat('day')}
					className='px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-50 dark:bg-blue-800 dark:text-blue-200 dark:border-blue-600 dark:hover:bg-blue-700 flex items-center'
				>
					{icons.today}
					<span>Day</span>
				</button>
				<button
					onClick={() => changeFormat('week')}
					className='px-4 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-300 rounded-md hover:bg-green-50 dark:bg-green-800 dark:text-green-200 dark:border-green-600 dark:hover:bg-green-700 flex items-center'
				>
					{icons.week}
					<span>Week</span>
				</button>
				<button
					onClick={() => changeFormat('month')}
					className='px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 border border-purple-300 rounded-md hover:bg-purple-50 dark:bg-purple-800 dark:text-purple-200 dark:border-purple-600 dark:hover:bg-purple-700 flex items-center'
				>
					{icons.month}
					<span>Month</span>
				</button>
				<button
					onClick={goToToday}
					className='px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md hover:bg-red-50 dark:bg-red-800 dark:text-red-200 dark:border-red-600 dark:hover:bg-red-700 flex items-center'
				>
					{icons.today}
					<span>Today</span>
				</button>
			</div>
		</div>
	</div>
)

export default CalendarHeader
