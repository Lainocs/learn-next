export default async function PostsLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className='p-4 bg-stone-900 rounded'>{children}</div>
}
