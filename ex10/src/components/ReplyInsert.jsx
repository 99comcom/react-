import axios from 'axios';
import React, {useState} from 'react'

const ReplyInsert = ({bno, callAPI}) => {
  const [content, setContent] = useState('');

  const onSubmit= async(e)=> {
    e.preventDefault();
    if(!window.confirm('댓글을 등록하실래요?')) return;
    await axios.post('/api/reply/insert',{bno:bno, content:content});
    callAPI();
    setContent('');
  }

  return (
    <form onSubmit={onSubmit}>
      <input 
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        placeholder='댓글을 입력하세요...' size={80}/>
      <button type="submit">등록</button>
    </form>
  )
}

export default ReplyInsert