// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import '../App.css';
// import { Form } from 'react-bootstrap';

// const ReplyList = ({bno}) => {
//     const [list,setList]=useState([]);
//     const [page,setPage]=useState(2);
//     const num=5;
//     const [last,setLast]=useState(1);
//     const [total,setTotal]=useState(0);
//     const [content,setContent]=useState('');
//     const [data,setData]=useState({
//         bno:bno,content:'',replyer:sessionStorage.getItem('uid')
//     });
//     const {bno,replyer,content}=data;
//     const onChange=(e)=>{
//         setData({
//             ...data,
//             content:e.target.value
//         })
//     }
//     const callAPI=async()=>{
//         const result=await axios.get(`/reply/list/${bno}?page=${page}&num=${num}`);
//         const newList=list.concat(result.data.list);
//         setList(newList);
//         setTotal(result.data.total);
//         setLast(Math.ceil(result.data.total/num));
//     }
//     useEffect(()=>{
//         callAPI();
//     },[page])

//     const onSubmit=async(e)=>{
//         e.preventDefault();
//         if(content===''){
//             alert('내용을 입력해 주세요');
//             return
//         }
       
//         await axios.post(`/reply/insert`,data);
//         setData({
//             bno:bno,content:'',replyer:sessionStorage.getItem('uid')
//         });
        
//     }
   
//     if(!list) return <h1>로딩중</h1>
//   return (
//     <div>
//         <Form onSubmit={onSubmit}>
//         <Form.Control
//         value={content}
//         onChange={(e)=>setContent(e.target.value)}
//         placeholder='내용을 입력하세요'
//         />
//         </Form>
//         <hr/>
//         {list.map(reply=>
//             <h4 key={reply.rno}><hr/>[{reply.rno}] {reply.replyer} // {reply.content}</h4>
//             )}
//             {page<last &&
//             <button 
//             onClick={()=>setPage(page+1)}
//             className='grayButton'>더보기</button>
//             }
//     </div>
//   )
// }

// export default ReplyList



import axios from 'axios'
import React, {useEffect, useRef, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Pagination from "react-js-pagination";
import './Paging.css';

const ReplyList = ({bno}) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [content, setContent]=useState('');
  const num=5;

  const callAPI = async() => {
    const result=await axios.get(`/reply/list/${bno}?page=${page}&num=${num}`);
    setList(result.data.list);
    setTotal(result.data.total);
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  const onSubmit = async(e) => {
    e.preventDefault();
    if(content === '') {
      alert('내용을 입력해 주세요!');
      return;
    }
   const data={
      bno: bno,
      replyer: sessionStorage.getItem('uid'),
      content: content
    };
    await axios.post('/reply/insert', data);
    setContent('');
    callAPI();
    setPage(1);
  }

  if(!list) return <h1>Loading......</h1>
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Control 
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          placeholder='내용을 입력하세요...'/>
        <button type="submit">등록</button>
      </Form>

      <hr/>
      {list.map(reply=>
        <p key={reply.rno}>[{reply.rno}] {reply.content}</p>
      )}
      <Pagination
        activePage={page}
        itemsCountPerPage={num}
        totalItemsCount={total}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={(e)=>setPage(e)}/>
    </div>
  )
}

export default ReplyList