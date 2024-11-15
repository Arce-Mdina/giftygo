import React from 'react'

import { useNavigate } from 'react-router-dom'

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <>
      <div><h1>The page you were looking for does not exist.</h1></div>
      <p>Please click the button below to go to the Home Page or click the Back Button.</p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </>
  )
}

export default NotFound