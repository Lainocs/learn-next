import { Suspense } from 'react'
import { COUNT, GET } from './posts.action'

const CountDisplay = async () => {
	const count = await COUNT()
	return (
		<div className='p-4 text-gray-600'>
			Total Posts: <span className='font-bold'>{count}</span>
		</div>
	)
}

const TableStructure = ({ children }: { children: React.ReactNode }) => (
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
			{children}
		</table>
	</div>
)

const PostsList = async () => {
	const [posts] = await Promise.all([GET(), COUNT()])

	if (posts.length === 0) {
		return <div className='p-4 text-gray-600'>No posts found</div>
	}

	return (
		<>
			<TableStructure>
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
			</TableStructure>
			{/* <PaginationControls
				totalPages={Math.ceil(count / itemsPerPage)}
				currentPage={page}
			/> */}
		</>
	)
}

const PostListSkeleton = () => (
	<TableStructure>
		<tbody>
			{Array.from({ length: 1 }).map((_, index) => (
				<tr key={index}>
					{Array.from({ length: 5 }).map((_, cellIndex) => (
						<td
							key={cellIndex}
							className='border p-2'
						>
							<div className='h-4 bg-gray-200 rounded animate-pulse'></div>
						</td>
					))}
				</tr>
			))}
		</tbody>
	</TableStructure>
)

export default async function PostsPage() {
	return (
		<>
			<Suspense fallback={<div className='p-4'>Loading count...</div>}>
				<CountDisplay />
			</Suspense>
			<Suspense fallback={<PostListSkeleton />}>
				<PostsList />
			</Suspense>
		</>
	)
}
