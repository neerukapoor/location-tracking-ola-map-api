import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"
import { useState } from "react";

const Login = () => {
    const {loading, login} = useLogin();

    const [inputs, setInputs] = useState({
        adminname: '',
        password: ''
    })

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(),
        await login(inputs)
    }

    return(
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-cyan-100 to-blue-200">
            <div className="bg-slate-100 p-6 rounded-xl shadow-lg max-w-md w-full">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[1rem]">
                        <h1 className="text-center text-3xl font-semibold text-blue-400">Admin Portal for Geo Location</h1>
                        <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input type="text" className="grow" placeholder="Username" value={inputs.adminname}
                        onChange={(e) => setInputs({...inputs, adminname:e.target.value})}/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" className="grow" placeholder="password" value={inputs.password}
                        onChange={(e) => setInputs({...inputs, password:e.target.value})}/>
                        </label>
                        <button className="btn text-blue-400 shadow-lg" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : "Login"}
                        </button>
                        <Link to="/signup" className="text-sm hover:underline text-right text-blue-400 hover:text-blue-600 mt-2 inline-block">
                            New Member? 
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login