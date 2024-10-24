import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../Context/AuthContext';
import axios from 'axios';

export const PostBody = ({id, name, body, picturePath, setView, view}) =>{

    const {user} = useAuth();


    return (
        <div>
            {/* options */}
            {(name === user) &&
                <div>
                    <Link to={`/dashboard/editpost/${id}`} ><button className='btn btn-blue'>Edit</button></Link>
                    <Link to={`/dashboard/deletepost/${id}`} ><button className='btn btn-red'>Delete</button></Link>
                </div>
            }
            <p className='base-color-text1 ma2'>{body}</p>
            {(picturePath && picturePath.length !==0) && <img src={picturePath} alt='postImage' className='h-80 h-auto br3' />}
        </div>
        
    );
}