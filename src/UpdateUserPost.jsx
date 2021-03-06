import React, { useState } from 'react'
import axios from "axios"

function UpdateUserPost(props) {
  const [date, setDate] = useState(props.userPost.fields.date)
  const [distance, setDistance] = useState(props.userPost.fields.distance)
  const [runTime, setRunTime] = useState(props.userPost.fields.runTime)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const fields = {
      date,
      distance,
      runTime,
    };

    const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/record/${props.userPost.id}`
    await axios.put(airtableURL, { fields },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      }
    )
    //need this here to rerender the page so that the input displays on the page without that page having to be reloaded
    props.setFetchUserPost(!props.fetchUserPost)
  }


  return (
    <div>
      <form className='update-form' onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          name='date'
          type="text"
          placeholder='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
          <label htmlFor="distance">Distance:</label>
        <input
          name='distance'
          type="text"
          placeholder='distance in miles'
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
          <label htmlFor="runTime">Runtime:</label>
        <input
          name='runTime'
          type="text"
          placeholder='total run time'
          value={runTime}
          onChange={(e)=> setRunTime(e.target.value)}
        />
        <button type="submit">Update Your Run!</button>
      </form>
    </div>
  )
}

export default UpdateUserPost;