import { Temporal } from '@js-temporal/polyfill'
import { Course } from '@prisma/client'
import { useEffect, useRef } from 'react'

interface SidePanelProps {
	selectedDay: Temporal.PlainDate | null
	courses: Course[]
	onClose: () => void
}

const SidePanel = ({ selectedDay, courses, onClose }: SidePanelProps) => {
	const panelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleEscape)
		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [onClose])

	if (!selectedDay) return null

	const dayCourses = courses.filter((course) =>
		Temporal.PlainDate.from(
			new Date(course.date).toISOString().split('T')[0]
		).equals(selectedDay)
	)

	return (
		<div
			ref={panelRef}
			className='fixed top-0 right-0 w-1/3 h-full bg-white dark:bg-gray-800 border-l border-gray-300 dark:border-gray-700 p-4'
		>
			<h2 className='text-xl font-semibold'>
				Details for{' '}
				{selectedDay.toLocaleString('en', {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				})}
			</h2>
			<div className='mt-4'>
				{dayCourses.map((course) => (
					<div
						key={course.id}
						className='mt-2 p-2 bg-blue-100 dark:bg-blue-800 rounded'
					>
						<h3 className='text-sm font-semibold'>{course.title}</h3>
						<p className='text-sm'>{course.professor}</p>
						<p className='text-sm'>{course.classroom}</p>
					</div>
				))}
			</div>
			<button
				onClick={onClose}
				className='mt-4 px-4 py-2 bg-red-500 text-white rounded'
			>
				Close
			</button>
		</div>
	)
}

export default SidePanel
