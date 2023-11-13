import { useParams } from "react-router"
import { useGetPostsQuery } from "../Network/api"
import {AiOutlineDelete} from 'react-icons/ai'
import {FiEdit2} from 'react-icons/fi'
import { Card } from "./PostScreen"


const SinglePost = () => {
    const params = useParams()

    const { post } = useGetPostsQuery(undefined, {
        selectFromResult: ({ data }) => ({
          post: data?.find((post) => post.id === params?.itemId),
        }),
      })

  return (
    <div className="flex justify-center mt-16">

        <Card id={1} data={post} handleClick={()=>{}}/>

    </div>
  )
}

export default SinglePost