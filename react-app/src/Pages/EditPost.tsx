import React, { useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../Context/AuthContext";
import axios from "axios";
import { validateTags } from "../Utils/validations";

const EditPost = ({post}) => {

    const tags = useRef<HTMLInputElement>(null)
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const {user} = useAuth();

    const navigate = useNavigate()

    async function handleSubmit (event) {
        event.preventDefault();
        
        const validtags = validateTags(tags.current?.value)
        if(!validtags.isValid){
            setErrorMessage(validtags.error);
            return;
        }

        if(!confirm('Are you sure you want to save details?'))  return;
        
        try{
          const formdata = new FormData(event.target);
          formdata.append("author_username", user)
    
          const resp = await axios.put(`/api/posts/update/${post.id}`, formdata)
          const data = await resp.data
  
          if(data.error){
            setErrorMessage(Object.values(data.error)[0][0])
            return;
          }
          navigate('/dashboard/posts')
  
        }catch(err){
            setErrorMessage("Something went wrong")
            console.log(err)
        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100"
            // onClick={()=> dispatch(setPosts())}
        >
            <div className="
                absolute z-50
                bg-white p-6 rounded-lg border border-gray-300 w-1/3 md:w-2/5"
                onClick={(event) => event.stopPropagation()}
            >
                <h1 className="text-2xl mb-3 mt-3 text-center">Edit Post</h1>
                {errorMessage ? <p className='text-center text-red-500 light text-base m-0 mb-2'>{errorMessage}</p>: <div></div>}
                <div className='flex justify-end items-start'>
                    <Link to='/dashboard/posts'>
                        <img src={'close'} alt='close' 
                            width={40} height={40}
                            className='opacity-30 cursor-pointer'
                        />
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className='p-2'>
                    <textarea
                        name="body"
                        placeholder="Write something..."
                        className="p-2 m-2 w-4/5 border border-gray-300 rounded"
                        defaultValue={post?.body}
                        required
                    />
                    <input
                        type="text"
                        name="tags"
                        ref={tags}
                        placeholder="Tags (space-separated)"
                        defaultValue={post?.tags}
                        className="p-2 m-2 mt-0 w-3/5 border border-gray-300 rounded"
                    />
                    {/* <div>
                        <div className='text-center mt-4 mb-3'>
                            <label htmlFor="image" className='block text-lg mb-3'>Add an image if you like</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className='ml-4'
                            />
                        </div>
                    </div> */}
                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded border border-blue-500 hover:bg-blue-600 transition duration-200"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPost;