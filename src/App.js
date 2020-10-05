import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import CreatePost from './CreatePost'
import UserPost from './UserPost';

function App() {
  const [userPost, setUserPost] = useState([])
  const [fetchUserPost, setFetchUserPost] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const airTableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/record`
      const response = await axios.get(airTableURL, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`
        }
      })
      setUserPost(response.data.records)
    }
    getData()
  },[fetchUserPost])
  return (
    <div className="App">
      <h1>Run-Tracker</h1>
      
        <CreatePost
          fetchUserPost={fetchUserPost}
          setFetchUserPost={setFetchUserPost}
          />
      
      {userPost.map((userPost) => (
        <div key={userPost.id}> 
          <UserPost
            userPost={userPost}
            key={userPost.id}
            fetchUserPost={fetchUserPost}
            setFetchUserPost={setFetchUserPost}
            />
        </div>
      ))}
    </div>
  );
}

export default App;
