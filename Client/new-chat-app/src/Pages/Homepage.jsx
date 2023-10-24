import React,{ useEffect }  from 'react'
import Login from "../components/authentication/Login"
import { useHistory } from 'react-router-dom'

const Homepage = () => {
    const history = useHistory()
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            history.push('/chat')
        }
        
    },[history])
  return (
      <div>
          <Login/>
    </div>
  )
}

export default Homepage