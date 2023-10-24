import React, { useState } from 'react'
import {ChatState} from "../context/ChatProvider"
import SideDrawer from '../components/misscelinious/SideDrawer'
import MyChats from '../components/MyChat'
import ChatBox from '../components/ChatBox'
// import {Box} from "@chakra-ui/layout"
import { Box } from '@chakra-ui/react'
const Chatpage = () => {
  const { user } = ChatState()
  const [fetchAgain,setFetchAgain]=useState(false)
  return (
    <div style={{ width: "100%" , height:"auto",border:"2px solid blue" }}>
      {user && <SideDrawer/>}
           {/* <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats />}
        {user && <ChatBox/>}
    </Box> */}
      <div style={{display:"flex",justifyContent:"space-between",height:"91.5vh",padding:"10px"}}>
        {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={ setFetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={ setFetchAgain} />}
      </div>
    </div>

  )
}

export default Chatpage