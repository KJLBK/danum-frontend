import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BoardList = () => {
	const [boardList, setBoardList] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const navigate = useNavigate()

	const URL = '/board/village/view/list'
	const Token =
		'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.azK0eQzXB-JhkBDdqCtf5xQQQOHUfWJ64cx-PA33Mig'

	useEffect(() => {
		axios
			.get(URL, {
				headers: {
					Authorization: `Bearer ${Token}`,
				},
			})
			.then((response) => {
				setBoardList(response.data)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}, [URL, Token])

	const handleViewDetails = (id) => {
		axios
			.get(`/board/village/view/${id}`, {
				headers: {
					Authorization: `Bearer ${Token}`,
				},
			})
			.then(() => {
				navigate(`/dev-board/${id}`)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}

	const filteredBoardList = boardList.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
				<h2 className="text-2xl font-bold mb-4">Board List</h2>
				<input
					type="text"
					placeholder="Search..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full p-2 mb-4 border border-gray-300 rounded"
				/>
				<ul className="divide-y divide-gray-200">
					{filteredBoardList.map((item) => (
						<li
							key={item.id}
							className="py-4 flex justify-between items-center"
						>
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									{item.title}
								</h3>
								<p className="text-sm text-gray-600">
									아이디: {item.id}
								</p>
								<p className="text-sm text-gray-600">
									조회수: {item.count}
								</p>
							</div>
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={() => handleViewDetails(item.id)}
							>
								자세히 보기
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default BoardList
