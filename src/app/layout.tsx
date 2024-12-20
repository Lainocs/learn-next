'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './globals.css'

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const pathname = usePathname()

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
										className={`block p-2 rounded transition-colors ${
											pathname === '/'
												? 'bg-gray-800 text-white'
												: 'hover:bg-gray-200'
										}`}
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										href='/posts'
										className={`block p-2 rounded transition-colors ${
											pathname === '/posts'
												? 'bg-gray-800 text-white'
												: 'hover:bg-gray-200'
										}`}
									>
										Posts (fetch)
									</Link>
								</li>
								<li>
									<Link
										href='/users'
										className={`block p-2 rounded transition-colors ${
											pathname === '/users'
												? 'bg-gray-800 text-white'
												: 'hover:bg-gray-200'
										}`}
									>
										Users (db actions)
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
