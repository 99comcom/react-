import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ReplyList from './ReplyList';

const BoardRead = ({match,history}) => {
    const bno=match.params.bno;
    const [board,setboard]=useState('');
    const callAPI=async()=>{
        const result=await axios.get(`/board/read/${bno}`);
        setboard(result.data);
    }
    useEffect(()=>{
        callAPI();
    })

    const onClickDelete=async()=>{
        if(!window.confirm('삭제하시겠습니까?'))return;
        await axios.post(`/board/delete/${bno}`);
        history.go(-1);
    }
    if(!board) return
  return (
    <div>
        <h3>({bno}) {board.title}</h3>
        <h5>{board.uname} {board.writer}</h5>
        <h7>{board.regDate} {board.update}</h7>
        <hr/>
        <h5>{board.content}</h5>
        {sessionStorage.getItem("uid")===board.writer &&
        <>
        <Link to ={`/board/update/${bno}`}><button className='grayButton' >수정</button></Link>
        <button onClick={onClickDelete} className='grayButton'>삭제</button>
        </>
        }
      <button onClick={()=>history.go(-1)} className='grayButton'>목록</button>
      <hr/>
      <ReplyList bno={bno}/>
    </div>
  )
}

export default BoardRead