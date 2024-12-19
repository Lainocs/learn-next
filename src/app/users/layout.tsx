export default async function UsersLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className='p-4 bg-stone-900 rounded'>{children}</div>
}
