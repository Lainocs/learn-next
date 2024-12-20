import Calendar from '@/components/calendar/Calendar'
import { get_courses } from '@/lib/api'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'HomePage',
	description: 'This is the home page',
}

export default async function Home() {
	const courses = await get_courses()
	return (
		<div className='w-full h-full'>
			<Calendar courses={courses} />
		</div>
	)
}
