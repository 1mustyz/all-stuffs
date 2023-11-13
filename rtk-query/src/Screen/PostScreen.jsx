
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {AiOutlineDelete} from 'react-icons/ai'
import {FiEdit2} from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid';

import { 
    useGetPostsQuery, 
    useCreatePostMutation,
    useDeletePostMutation 
} from '../Network/api'
import { useNavigate } from 'react-router'

const PostScreen = () => {

    const navigate = useNavigate()

    const [userName, SetUserName] = useState('')
    const [post, SetPost] = useState('')


    const {data, error, isLoading, isFetching} = useGetPostsQuery()

    const [createPost, {isLoading: isLoadingPost, isSuccess}] = useCreatePostMutation()




  return (
    <div className="flex justify-center items-center">

        {!isLoading ? <div className="max-h-[90vh] w-[40%] mt-10 border-1 p-3 overflow-y-auto">


            <div className="flex flex-col gap-2 sticky top-[-12px] bg-white">
                <input
                    className=" focus:outline-none border-1 border-[black] p-2"
                    type="text" 
                    placeholder="Enter Name" 
                    value={userName}
                    onChange={(e) => SetUserName(e.target?.value)}
                />

                <input
                    className=" focus:outline-none border-1 border-[black] p-2"
                    type="text" 
                    placeholder="Enter Post" 
                    value={post}
                    onChange={(e) => SetPost(e.target?.value)}
                />

                <button 
                    disabled={isLoadingPost}
                    onClick={()=> {
                        const p = {
                            id: uuidv4(),
                            name: userName,
                            post
                        }
                        createPost(p)
                    }}
                    className="px-3 py-1 bg-gray-300">
                       {isLoadingPost ? 'posting ..' : 'Create post'}
                    </button>

            </div>


            <div className='mt-4 border-t-1 py-2 border-[black]'>
                {data.map((x, index) => (
                    <Card 
                        id={index}
                        data={x}
                        handleClick={()=> navigate(`/single-post/${x?.id}`)}
                    />
                ))}
            </div>
           
            

        </div>
        :
        <p>Loading...</p>
        }

    </div>
  )
}


export default PostScreen



export const Card = ({data, id, handleClick}) => {
    const navigate = useNavigate()

    const [deletePost, {isLoading: deletingPost, isSuccess}] = useDeletePostMutation()

    useEffect(()=> {
        if(isSuccess) navigate('/')
    },[isSuccess])

  return (
    
    <div 
        onClick={handleClick}
        key={id}
        className='rounded-md shadow-small-select cursor-pointer justify-between flex items-center gap-3 p-3'>

        <div className='flex flex-col gap-2 w-[90%]'>
            <p>{data?.name}</p>
            <p>{data?.post}</p>
        </div>

        <div className='flex flex-col gap-4'>
            <FiEdit2 
                onClick={(e)=> {
                    e.stopPropagation()
                    navigate(`/edit-post/${data?.id}`)
                }}
                className='cursor-pointer'/>

            { !deletingPost ? <AiOutlineDelete 
                onClick={(e) => {
                    e.stopPropagation()
                    deletePost(data?.id)
                }}
                className='text-[red] cursor-pointer'/>

              :
              <p className='text-[10px] text-[red]'>deleting ...</p>  
            }   
        </div>

    </div>
  )
}

Card.propTypes = {
    name: PropTypes.string,
    post: PropTypes.string
}
