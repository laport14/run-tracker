import React, {useState} from 'react'
import axios from 'axios'
import UpdateUserPost from './UpdateUserPost'

function UserPost(props) {
  const [deleted, setDeleted] = useState(false)
  
  const handleDelete = async () => {
    setDeleted(true)
    const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/record/${props.userPost.id}`
    await axios.delete(airtableURL,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      }
    )
    //need this here to rerender the page so that the input displays on the page without that page having to be reloaded
    props.setFetchUserPost(!props.fetchUserPost)
    setDeleted(false)
  }

  return (
    <div className="container">
      <div className='userpost'>
      <p>Date: {props.userPost.fields.date}</p>
      <p>Distance: {props.userPost.fields.distance} miles</p>
        <p>Runtime: {props.userPost.fields.runTime} minutes</p>
        <button className='delete-button' onClick={handleDelete}>{deleted ? "Deleted" : "Delete"} </button>
        
        <UpdateUserPost
          userPost={props.userPost}
          fetchUserPost={props.fetchUserPost}
          setFetchUserPost={props.setFetchUserPost}/>
      </div>
    </div>
  )
}

export default UserPost;