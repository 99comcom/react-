import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

const HeaderPage = () => {
    const [uid,setUid]=useState('');
    const onLogout=()=>{
      sessionStorage.removeItem('uid');
      setUid('');
    }
    useEffect(()=>{
      setUid(sessionStorage.getItem('uid'));
  
    },[uid]);
  return (
    <div className='main_menu'>
        <Link to="/">Home</Link>
        <Link to="/board/list">Board</Link>
        <Link to="/user/list">User</Link>
        <Link to="/product/list">product</Link>
        {!uid ?
        <Link to="/login" style={{float:'right' , fontSize:'15px'}}>Login</Link>
        :
        <div style={{float:'right' , fontSize:'15px'}}>
        <span>{uid} 님</span><br></br>
        <Link to="/" style={{float:'right' , fontSize:'15px'}} onClick={onLogout}>Logout</Link>
        
        </div>
        }
        <hr/>
    </div>
  )
}

export default HeaderPage