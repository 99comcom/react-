import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReplyInsert from './ReplyInsert';
import RplyList from './RplyList';

const BoardRead = ({match}) => {
  const bno=match.params.bno;
  const [board, setBoard] = useState('');
  const [replycnt, setReplycnt] = useState(0)
  const {title,content,viewcnt,regDate} = board;

  const callAPI = async()=>{
    const result=await axios.get(`/api/board/read/${bno}`);
    setBoard(result.data);
    setReplycnt(result.data.replycnt);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  if(!board) return <h1>Loading......</h1>
  return (
    <div>
      <h4>{bno} : {title}</h4>
      <h4>조회수 : {viewcnt}</h4>
      <h4>댓글수 : <span style={{color:'red'}}>{replycnt}</span></h4>
      <hr/>
      <p>{content}</p>
      <hr/>
      <RplyList bno={bno} setReplycnt={setReplycnt}/>
    </div>
  )
}

export default BoardRead