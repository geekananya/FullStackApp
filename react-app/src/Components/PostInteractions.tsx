import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const PostInteractions = ({id, tags, likes, setView, view}) =>{

    const [isLiked, setIsLiked] = useState(false)

    useEffect(()=>{
        axios.get(`/api/posts/getlikestatus/${id}`)
        .then(resp=> resp.data)
        .then(data=> {
            setIsLiked(data.isLiked)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [view, id])

    // handler functions
    const handleLike = () => {
        axios.post(`/api/posts/like/${id}`)
        .then(resp=> resp.data)
        .then(data=> {
            if(data.error){
                console.log(data.error)
                return;
            }
        })
        .catch((err)=>{
            alert('An error occurred')
            console.log(err)
        })
        setView(view+1)
    }

    const handleUnlike = () => {
        axios.delete(`/api/posts/unlike/${id}`)
        .then(resp=> resp.data)
        .then(data=> {
            if(data.error){
                console.log(data.error)
                return;
            }
        })
        .catch((err)=>{
            alert('An error occurred')
            console.log(err)
        })
        setView(view+1)
    }

    return (
        <div className='flex justify-between items-center'>
                {/*Tags*/}
                <p className='text-sm cursor-pointer my-2'>
                    {tags.filter(tag=> tag.length).map(tag => `#${tag} `)}
                </p>
                {/*Reactions, replies*/}
                <div className='relative flex items-center mr-3'>
                    <p className='cursor-pointer' onClick={isLiked? handleUnlike: handleLike}>{isLiked ? 'Unlike' : 'Like'}</p>
                    {/* <img src={unlike} alt='unlike' className='unlike' />
                    <img src={like} alt='like' className='cursor-pointer' /> */}
                    <p className='inline-block mx-2 font-bold'>{likes}</p>
                    {/* <img src={comment} alt='comment' className='cursor-pointer comment' /> */}
                    {/* <p className='inline-block mx-2 font-bold'>{Math.max(Object.keys(post.likes).length - 3, 0)}</p> */}
                </div>
        </div>
    )
}