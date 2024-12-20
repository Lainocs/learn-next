'use server'

import { prisma } from '@/lib/prisma'

export async function get_courses() {
	const courses = await prisma.course.findMany()
	return courses
}
