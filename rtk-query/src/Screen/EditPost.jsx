
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useGetPostsQuery, useUpdatePostMutation } from "../Network/api"
import { useNavigate } from "react-router"

const EditPost = () => {

    const params = useParams()
    const navigate = useNavigate()

    const { post: data } = useGetPostsQuery(undefined, {
        selectFromResult: ({ data }) => ({
          post: data?.find((post) => post.id === params?.itemId),
        }),
      })

    const [userName, SetUserName] = useState(data?.name)
    const [post, SetPost] = useState(data?.post)

    const [updatePost, {isLoading, isSuccess}] = useUpdatePostMutation()

    useEffect(()=>{
        if(isSuccess){
            navigate(-1)
        }

    },[isSuccess])


  return (
    <div className="flex justify-center items-center">


        <div className="max-h-[90vh] w-[40%] mt-10 border-1 p-3 overflow-y-auto">
            <p className="text-center mb-2">Edit post</p>


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
                    disabled={isLoading}
                    onClick={()=> {
                        const p = {
                            id: data?.id,
                            name: userName,
                            post
                        }
                        updatePost(p)
                    }}
                    className="px-3 py-1 bg-gray-300">
                    {isLoading ? 'Editing ..' : 'Edit post'}
                    </button>

            </div>


        
            

        </div>
   

</div>
  )
}

export default EditPost