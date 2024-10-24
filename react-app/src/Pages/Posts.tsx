import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../Context/AuthContext';
import { PostBody } from '../Components/PostBody';
import { PostInteractions } from '../Components/PostInteractions';
import { PostAuthor } from '../Components/PostAuthor';


type postType = {
    id: number,
    author_username: string,
    body: string,
    tags: string,
    likes_no: number,
    userPicturePath?: string,
    picturePath?: string,
}


const Posts = ({searchTag}) =>{
    
    const [posts, setPosts] = useState<postType[]>([])
    const [view, setView] = useState(0)     // update everytime backend data is changed by user

    const {user} = useAuth();

    useEffect(() => {
        axios.get(`/api/posts/get/${searchTag}`)
        .then(resp=> resp.data)
        .then(data=> {
            setPosts(data)
        })
        .catch(console.log)
    }, [user, view, searchTag])

    console.log(posts)

    if(posts.length===0)
        return 
            <div className='flex flex-column items-center'>
                <h1 className='base-color-text1 tc mt4'>No Posts Found!</h1>
                {/* <button className='button br-pill f4 pa2' onClick={()=>dispatch(setTag({searchText: ''}))}>Go Back</button> */}
            </div>;
            
    return posts.map((post)=> 
        <>
            <PostAuthor name={post.author_username} userAvatar={post.userPicturePath}/>
            <PostBody id={post.id} name={post.author_username} body={post.body} picturePath={post.picturePath} setView={setView} view={view}/>
            <PostInteractions id={post.id} tags={post.tags?.split(" ")} likes={post.likes_no} setView={setView} view={view}/>
            <hr/>
        </>
    )
}

export default Posts;