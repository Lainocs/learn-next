import { PaginationControls } from '@/components/pagination'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { COUNT, GET } from './users.action'

export const metadata: Metadata = {
	title: 'Users',
	description: 'List of users',
}

const CountDisplay = async () => {
	const count = await COUNT()
	return (
		<div className='p-4 text-gray-600'>
			Total Users: <span className='font-bold'>{count}</span>
		</div>
	)
}

const TableStructure = ({ children }: { children: React.ReactNode }) => (
	<div className='p-4'>
		<table className='min-w-full border'>
			<thead>
				<tr>
					<th className='border p-2'>ID</th>
					<th className='border p-2'>Name</th>
					<th className='border p-2'>Email</th>
				</tr>
			</thead>
			{children}
		</table>
	</div>
)

const UsersList = async ({ page }: { page: number }) => {
	const [users, count] = await Promise.all([GET(page), COUNT()])
	const itemsPerPage = 2

	if (users.length === 0) {
		return <div className='p-4 text-gray-600'>No users</div>
	}

	return (
		<>
			<TableStructure>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td className='border p-2'>{user.id}</td>
							<td className='border p-2'>{user.name}</td>
							<td className='border p-2'>{user.email}</td>
						</tr>
					))}
				</tbody>
			</TableStructure>
			<PaginationControls
				totalPages={Math.ceil(count / itemsPerPage)}
				currentPage={page}
			/>
		</>
	)
}

const UserListSkeleton = () => {
	return (
		<TableStructure>
			<tbody>
				{Array.from({ length: 1 }).map((_, index) => (
					<tr key={index}>
						<td className='border p-2'>
							<div className='h-4 bg-gray-200 rounded animate-pulse'></div>
						</td>
						<td className='border p-2'>
							<div className='h-4 bg-gray-200 rounded animate-pulse'></div>
						</td>
						<td className='border p-2'>
							<div className='h-4 bg-gray-200 rounded animate-pulse'></div>
						</td>
					</tr>
				))}
			</tbody>
		</TableStructure>
	)
}

export default async function UsersPage(props: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const searchParams = await props.searchParams
	const currentPage = Number(searchParams.page) || 1

	return (
		<>
			<Suspense fallback={<div className='p-4'>Loading count...</div>}>
				<CountDisplay />
			</Suspense>
			<Suspense fallback={<UserListSkeleton />}>
				<UsersList page={currentPage} />
			</Suspense>
		</>
	)
}
