import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLogin } from '../api/auth/api'

export default function Login() {
	const [err, setErr] = useState()
	const [auth, setAuth] = useState({
		email: '',
		password: '',
	})
	const navigator = useNavigate()

	const sendLoginRequest = async (event) => {
		event.preventDefault() // Submit - 새로고침 방지
		const authStatus = await fetchLogin(auth)
		if (authStatus.code === 200) {
			navigator('/')
		} else if (authStatus.code === 400) {
			setErr(authStatus.message)
		}
	}

	const handleemailChange = (e) => {
		setAuth((prevAuth) => ({
			...prevAuth,
			email: e.target.value,
		}))
	}

	const handlePasswordChange = (e) => {
		setAuth((prevAuth) => ({
			...prevAuth,
			password: e.target.value,
		}))
	}

	return (
		<>
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
					<h2 className="text-3xl font-bold text-center text-gray-900">
						<Link to="/">임시로그인</Link>
					</h2>
					<form onSubmit={sendLoginRequest} className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="text-sm font-medium text-gray-700"
							>
								이메일
							</label>
							<input
								type="email"
								value={auth.email}
								id="email"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="이메일을 입력하세요"
								onChange={handleemailChange}
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="text-sm font-medium text-gray-700"
							>
								비밀번호
							</label>
							<input
								type="password"
								value={auth.password}
								id="password"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="비밀번호를 입력하세요"
								onChange={handlePasswordChange}
							/>
						</div>
						{err && (
							<div className="text-red-500 text-sm">{err}</div>
						)}
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							로그인
						</button>
					</form>
				</div>
			</div>
		</>
	)
}