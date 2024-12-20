interface PaginationProps {
	totalPages: number
	currentPage: number
}

export const PaginationControls = ({
	totalPages,
	currentPage,
}: PaginationProps) => {
	return (
		<div className='flex justify-center gap-2 p-4'>
			<a
				href={`?page=${currentPage - 1}`}
				className={`px-3 py-1 border rounded ${
					currentPage <= 1 ? 'pointer-events-none opacity-50' : ''
				}`}
			>
				Previous
			</a>
			<span className='px-3 py-1'>
				Page {currentPage} of {totalPages}
			</span>
			<a
				href={`?page=${currentPage + 1}`}
				className={`px-3 py-1 border rounded ${
					currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
				}`}
			>
				Next
			</a>
		</div>
	)
}
