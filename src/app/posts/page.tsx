import { Suspense } from 'react'

interface Post {
	id: number
	title: string
	author: string
	date: string
	category: string
}

export default async function PostsPage() {
	const data = await fetch('https://api.vercel.app/blog')
	const posts: Post[] = await data.json()

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className='p-4'>
				<table className='min-w-full border'>
					<thead>
						<tr>
							<th className='border p-2'>ID</th>
							<th className='border p-2'>Title</th>
							<th className='border p-2'>Author</th>
							<th className='border p-2'>Date</th>
							<th className='border p-2'>Category</th>
						</tr>
					</thead>
					<tbody>
						{posts.map((post) => (
							<tr key={post.id}>
								<td className='border p-2'>{post.id}</td>
								<td className='border p-2'>{post.title}</td>
								<td className='border p-2'>{post.author}</td>
								<td className='border p-2'>{post.date}</td>
								<td className='border p-2'>{post.category}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Suspense>
	)
}
