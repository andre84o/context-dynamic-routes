'use client';

const LoginForm = () => {
    const handleClick = () => {
        
    }
    return (
    <section className="flex justify-center items-center w-full bg-white p-6 min-h-[calc(100vh-48px)]">
            <form className="flex flex-col w-full max-w-md text-black bg-white p-6 rounded shadow">
                <label htmlFor="username">Username:</label>
                <input id="username" placeholder="Username" className="border p-2 rounded mb-3 w-full" />
                <label htmlFor="password">Password:</label>
                <input id="password" placeholder="Password" className="border p-2 rounded mb-3 w-full" />
                <button onClick={() => {}} className="bg-blue-600 text-white p-2 rounded w-full">Login</button>
            </form>
        </section>
    )
}

export default LoginForm