import axios from 'axios';
import React from 'react'

const ReplyItem = ({reply, callAPI}) => {
  const {rno, content, replyDate} = reply;
  const onClickDelete= async(rno)=>{
    if(!window.confirm(`${rno}번 댓글을 삭제하실래요?`)) return;
    await axios.post(`/api/reply/delete/${rno}`); 
    alert('삭제성공....');
    callAPI();
  }
  
  return (
    <tr>
        <td width={100}>{rno}</td>
        <td width={400}>{content}</td>
        <td width={200}>{replyDate}</td>
        <td><button onClick={()=>onClickDelete(rno)}>삭제</button></td>
    </tr>
  )
}

export default ReplyItem