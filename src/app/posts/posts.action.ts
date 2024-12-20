'use server'

type Post = {
	id: number
	title: string
	author: string
	date: string
	category: string
}

export async function COUNT() {
	// Simulate API call
	return 25
}

export async function GET() {
	// Simulate API call
	const posts: Post[] = await fetch('https://api.vercel.app/blog').then(
		(res: { json: () => Promise<Post[]> }) => res.json()
	)

	return posts
}
