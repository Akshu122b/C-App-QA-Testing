import React from 'react'
import Modal from 'react-modal'; 
import Login from './Login';



Modal.setAppElement('#root');
function Home() {
  return (
    <div>
     <Login />
    </div>
  )
}

export default Home