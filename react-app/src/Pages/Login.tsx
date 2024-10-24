import React from 'react';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';       // use navlink for tabs in dashboard
import useAuth from '../Context/AuthContext';
import Button from '../Components/UI/Button';

const Login = () =>{
    //refs
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>('');
    const {setToken, setUser} = useAuth()
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
    
            const resp = await axios.post("/api/auth/login", {
                username: username.current?.value, password: password.current?.value
            })
            const data = await resp.data
            if(data.error){
                setErrorMessage("ERROR: Invalid Credentials!")
                return;
            }

            setToken(data.token)
            setUser(data.user.username)
            navigate('/dashboard')

        }catch(err){
            console.log(err)
        }
        // console.log({username: username.current?.value, password: password.current?.value})
    }

    return(
        <div className='p-4 w-2/5 base-color-text1'>
            <form onSubmit={handleSubmit} >
                <h2 className="text-center my-2">Sign In</h2>
                {errorMessage.length>0 ? <p className='text-center text-red-500 font-light text-base m-0 mb-2'>{errorMessage}</p>: <div></div>}
                <div className='w-3/4 mx-auto'>
                    <div className="mb-3">
                    <label className="block">Username</label>
                    <input
                        type="text"
                        className="input-reset border-2 b-black p-2 mb-2 block w-full"
                        ref={username}
                        // defaultValue={import.meta.env.VITE_defaultemail}
                        required
                        autoComplete="on"
                    />
                    </div>
                    <div className="mb-3">
                    <label className="block">Password</label>
                    <input
                        type="password"
                        className="input-reset border-2 b-black p-2 mb-2 block w-full"
                        ref={password}
                        // defaultValue={import.meta.env.VITE_defaultpass}
                        required
                        autoComplete="current-password"
                    />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Button
                        content={'Sign In'}>
                    </Button>
                </div>
                <hr className='mx-auto w-1/2'></hr>
                <div className='text-center sign-up'>
                    Don't have an account? <Link to='/register'><p className='text-red inline-block underline cursor-pointer'>Sign up</p></Link>
                </div>
            </form>
        </div>
    )
}

export default Login;