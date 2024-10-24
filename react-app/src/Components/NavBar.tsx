import React from "react";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Context/AuthContext";
import Button from "./UI/Button";

export default function NavBar ({setSearchField}){

    const search = useRef<HTMLInputElement>(null);
    const {setToken} = useAuth();

    const navigate = useNavigate();


    const handleSearch = ()=>{
        setSearchField(search.current?.value);
    }

    const handleLogout = () => {
        setToken(null)
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="sticky top-0 z-40 bg-slate-200 flex items-center justify-between
                         p-2 pt-2 pb-2 pr-4  shadow-[0_0_60px_0_rgba(0,0,0,0.3)]">
            {/* <div className='flex align-center w-30'>
                <img src={logo} alt='Connect App' className='ml3 pointer' onClick={()=>{dispatch(setPosts()); dispatch(setTag({searchText: ''}))}}></img>
            </div> */}
            <div className='flex items-center w-2/5 p-2'>
                <NavLink to='/dashboard/posts' onClick={()=> {setSearchField(''); search.current.value=''}}><p className="mx-2">All Posts</p></NavLink>
                <NavLink to='/dashboard/createpost'><p className="mx-2">Create post</p></NavLink>
                <input
                    type="text"
                    className="input-reset border-2 b-black p-2 inline-block rounded-full br--left h-fit mx-2"
                    ref={search}
                    placeholder= "Search Posts by tags.."
                    required
                    autoComplete="on"
                    //onchange={handle change}
                />
                <Button
                    onClick={handleSearch}
                    content={'Search'}>
                </Button>
                <NavLink to='/'><button onClick={handleLogout}>Logout</button></NavLink>
            </div>
        </div>
    )
}