import React from 'react'

const Dashboard = ({setIsLoggedIn}) => {
  return (
    <div>
    <button onClick={()=>setIsLoggedIn(false)}>Log out</button>
    </div>
  )
}

export default Dashboard