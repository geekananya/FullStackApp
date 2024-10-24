import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';       // use navlink for tabs in dashboard
import useAuth from '../Context/AuthContext';
import axios from 'axios';
import Button from '../Components/UI/Button';
import { validateUsername, validatePassword } from '../Utils/validations';

const Register = () =>{
    //refs
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const cpassword = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string | undefined>('');

    const {setToken, setUser} = useAuth()
    const navigate = useNavigate();
    
    async function handleSubmit (event) {
      event.preventDefault();

      const validusername = validateUsername(username.current?.value)
      if(!validusername.isValid){
        setErrorMessage(validusername.error);
        return;
      }

      const validpassword = validatePassword(password.current?.value)
      if(!validpassword.isValid){
        setErrorMessage(validpassword.error);
        return;
      }

      if(password.current?.value !== cpassword.current?.value){
        setErrorMessage("ERROR: Passwords don't match!");
        return;
      }
      try{
        const formdata = new FormData(event.target);
  
        const resp = await axios.post("/api/auth/register", formdata)
        const data = await resp.data

        if(data.error){
          setErrorMessage(Object.values(data.error)[0][0])
          return;
        }

        setToken(data.token)
        setUser(data.user.username)
        navigate('/dashboard')

      }catch(err){
        console.log(err)
      }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2 className="text-center my-2">Register</h2>
            {errorMessage && errorMessage.length>0 ? <p className='text-center text-red-500 light text-base m-0 mb-2'>{errorMessage}</p>: <div></div>}
            <div className='flex justify-center'>
              <div className="mb-3 mx-3">
                <label htmlFor='fname' className="block">First Name</label>
                <input
                  name='first_name'
                  type="text"
                  className="input-reset border-2 b-black p-2 mb-2 block w-full"
                  autoComplete='off'
                  required
                />
              </div>
              <div className="mb-3 mx-3">
                <label className="block" >Last Name</label>
                <input
                  name='last_name'
                  type="text"
                  className="input-reset border-2 b-black p-2 mb-2 block w-full"
                  autoComplete='off'
                />
              </div>
            </div>
            <div className='flex justify-center'>
              <div className="mb-3 mx-3">
                <label className="block">Email</label>
                <input
                  name='email'
                  type="email"
                  className="input-reset border-2 b-black p-2 mb-2 block w-full"
                  autoComplete='email'
                  pattern="[^@]*@[^.]*\..*"
                  required
                />
              </div>
              <div className="mb-3 mx-3">
                <label className="block">Username</label>
                <input
                  name='username'
                  type="text"
                  ref={username}
                  className="input-reset border-2 b-black p-2 mb-2 block w-full"
                  autoComplete='off'
                  required
                />
              </div>
            </div>
            <div className='flex justify-center'>
              <div className="mb-3 mx-3">
                <label className="block">Set Password</label>
                <input
                    type="password"
                    name='password'
                    className="input-reset border-2 b-black p-2 mb-2 block w-full"
                    ref={password}
                    autoComplete='new-password'
                    // minLength='6'
                    required
                />
              </div>
              <div className="mb-3 mx-3">
                <label className="block">Confirm Password</label>
                <input
                    type="password"
                    className="input-reset border-2 b-black p-2 mb-2 block w-full"
                    ref={cpassword}
                    autoComplete='new-password'
                    required
                />
              </div>
            </div>
            <div className='flex justify-center'>
                <Button
                    content={'Register'}>
                </Button>
            </div>
            <p className='text-center'>OR</p>
            <hr className='mx-auto w-1/2'></hr>
            <div className='text-center sign-up'>
                Already have an account? <Link to='/login'><p className='text-red inline-block underline cursor-pointer'>Sign in</p></Link>
            </div>
          </form>
    )
}

export default Register;