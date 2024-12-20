'use server'

import { prisma } from '@/lib/prisma'

export async function GET(page = 1, limit = 2) {
	await new Promise((resolve) => setTimeout(resolve, 2000))
	const skip = (page - 1) * limit
	const users = await prisma.user.findMany({
		take: limit,
		skip: skip,
	})
	return users
}

export async function COUNT() {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	const count = await prisma.user.count()
	return count
}
