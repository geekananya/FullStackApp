import React from 'react';


export const PostAuthor = ({name, userAvatar}) =>{


    // handler functions

            
    return (
        <div className='flex justify-between align-center'>
            <div className='flex items-center cursor-pointer'
                // onClick={() => props.handleClick(post.poster_id)}
            >
                {/*user-info*/}
                <img 
                    src={userAvatar || `https://www.robohash.org/23${name}212`} 
                    alt='pfp' 
                    className='bg-dark-blue h-12 w-12 mr-3' 
                />
                <p className='text-lg text-gray-800'>{name}</p>
            </div>
        </div>
    )
}