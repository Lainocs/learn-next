import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<body>
				<div className='flex h-screen'>
					<aside className='w-64 bg-black-100 p-4 border-r'>
						<nav>
							<ul className='space-y-2'>
								<li>
									<Link
										href='/'
										className='block p-2 hover:bg-gray-200 rounded'
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										href='/posts'
										className='block p-2 hover:bg-gray-200 rounded'
									>
										Posts
									</Link>
								</li>
								<li>
									<Link
										href='/users'
										className='block p-2 hover:bg-gray-200 rounded'
									>
										Users
									</Link>
								</li>
							</ul>
						</nav>
					</aside>
					<div className='flex-1 flex flex-col'>
						<header className='h-16 bg-black border-b flex items-center px-6'>
							<h1 className='text-xl font-semibold'>Dashboard</h1>
						</header>
						<main className='flex-1 p-6 overflow-auto'>{children}</main>
					</div>
				</div>
			</body>
		</html>
	)
}
