import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReplyInsert from './ReplyInsert';
import ReplyItem from './ReplyItem';

const RplyList = ({bno, setReplycnt}) => {
  const [list, setList] = useState([]);

  const callAPI = async() => {
    const result = await axios.get(`/api/                                                       /list/${bno}`);
    setList(result.data.list);
    setReplycnt(result.data.total);
  }

  useEffect(()=>{
    callAPI();
  } ,[]);

  if(!list) return <h1>Loading......</h1>
  
  return (
    <div>
      <h3>Reply List</h3>
      <ReplyInsert bno={bno} callAPI={callAPI}/>
      <table>
        <tbody>
          {list.map(reply=>
            <ReplyItem key={reply.rno} reply={reply} callAPI={callAPI}/>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RplyList