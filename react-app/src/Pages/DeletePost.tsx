import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../Context/AuthContext";
import axios from "axios";
import { validateTags } from "../Utils/validations";


const DeletePost = ({post}) => {

    const navigate = useNavigate()

    // async function handleSubmit (event) {
    //     event.preventDefault();

    //     if(!confirm('Are you sure you want to save details?'))  return;

    //     const validtags = validateTags(tags.current?.value)
    //     if(!validtags.isValid){
    //         setErrorMessage(validtags.error);
    //         return;
    //     }
        
    //     try{
    //       const formdata = new FormData(event.target);
    //       formdata.append("author_username", user)
    
    //       const resp = await axios.put(`/api/posts/update/${postid}`, formdata)
    //       const data = await resp.data
  
    //       if(data.error){
    //         setErrorMessage(Object.values(data.error)[0][0])
    //         return;
    //       }
    //       navigate('/dashboard/posts')
  
    //     }catch(err){
    //         setErrorMessage("Something went wrong")
    //         console.log(err)
    //     }
    // }

    function handleDelete(){
        axios.delete(`/api/posts/delete/${post.id}`)
        .then(resp=> resp.data)
        .then(data=> {
            if(data.error){
                alert('Post could not be deleted!')
                return;
            }
            navigate('/dashboard/posts')
        })
        .catch((err)=>{
            alert('Post could not be deleted!')
            console.log(err)
        })
    }

    return (
        <div className="text-center min-h-screen flex flex-col items-center"
            // onClick={()=> dispatch(setPosts())}
        >
            <h1 className="text-2xl mb-3 mt-3 text-center">Delete Post</h1>
            <h3>Are you sure you want to delete this post?</h3>

            <div className="center w-1/3 bg-gray-100 my-2 py-2">
                <p className='base-color-text1 ma2'>{post.body}</p>
                {(post.picturePath && post.picturePath.length !==0) && <img src={post.picturePath} alt='postImage' className='h-80 h-auto br3' />}
            </div>
            <div>
                <button className="btn btn-red" onClick={handleDelete}>Delete</button>
                <button className="btn btn-blue" onClick={()=> navigate('/dashboard/posts')}>Cancel</button>
            </div>
        </div>
    );
}

export default DeletePost;