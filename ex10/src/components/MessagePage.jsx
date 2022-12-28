import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import HeadPage from './HeadPage'
import ReceiveMessage from './ReceiveMessage'
import SendMessage from './SendMessage'
import { UserContext } from '../context/UserContext'

const MessagePage = () => {
    const uid=sessionStorage.getItem('uid');
    const [user, setUser]=useState({
        uname:'',
        point:0,
        receivecnt:0,
        sendcnt:0
    });
    const {uname, point,receivecnt,sendcnt} = user;
    const callAPIUser=async()=>{
        const result=await axios.get(`/api/user/read/${uid}`)
        setUser(result.data);
    }

    useEffect(()=>{
        callAPIUser();
    },[]);

  return (
    <UserContext.Provider value={{callAPIUser}}>
    <div>
       <HeadPage/>
        <div className='sub_menu'>
            <Link to="/message/receive">받은 메세지({receivecnt})</Link>
            <Link to="/message/send">보낸 메세지({sendcnt})</Link>
            <span>포인트:{point}</span>
        </div>
       <Route path="/message/receive" setUser={setUser} component={ReceiveMessage}/>
       <Route path="/message/send" component={SendMessage}/>
    </div>
    </UserContext.Provider>
  )
}

export default MessagePage