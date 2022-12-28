import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import ReceiveItem from './ReceiveItem';


const ReceiveMessage = ({setUser}) => {
    const [list,setList]=useState([]);

    const uid=sessionStorage.getItem('uid')
    const callAPI=async()=>{
        const result=await axios.get(`/api/message/receive/${uid}`);
        setList(result.data);
    }
    useEffect(()=>{
        callAPI();
    },[]);
    if(!list) return <h1>Loading...</h1>
  return (

    <div>

    <Table className='my-5'>
        <thead>
        <tr style={{backgroundColor:"blue" ,color:"white" , fontSize:'15px'}}>
                <td>No.</td>
                <td>보낸이</td>
                <td>보낸날짜</td>
                <td>읽은날짜</td>
                <td>보기</td>
            </tr>
            </thead>
        <tbody>
        {list.map(msg=>
            <ReceiveItem key={msg.uid} msg={msg} setUser={setUser} callAPI={callAPI}/>
            )}
        </tbody>
      
    </Table>
   
    </div>
  )
}

export default ReceiveMessage