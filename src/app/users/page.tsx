import { prisma } from '@/lib/prisma'
import { Suspense } from 'react'

export default async function UsersPage() {
	const data = await prisma.user.findMany()
	const users = data

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className='p-4'>
				<table className='min-w-full border'>
					<thead>
						<tr>
							<th className='border p-2'>ID</th>
							<th className='border p-2'>Name</th>
							<th className='border p-2'>Email</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td className='border p-2'>{user.id}</td>
								<td className='border p-2'>{user.name}</td>
								<td className='border p-2'>{user.email}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Suspense>
	)
}
