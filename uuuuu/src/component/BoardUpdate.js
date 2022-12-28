import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BoardUpdate = ({match,history}) => {

    const bno=match.params.bno;
    const [board,setboard]=useState('');
    const {title,content,writer,regData,updatedate,uname} = board;
    const callAPI=async()=>{
        const result=await axios.get(`/board/read/${bno}`);
        setboard(result.data);
    }
    const onChangeForm=(e)=>{
        setboard({
            ...board,
            [e.target.name]:e.target.value
        })
    }
    const onSubmit=async()=>{
        if(!window.confirm("수정하시겠습니까?"))return;
        await axios.post(`/board/update/`,board)
        history.go(-2)
    }
    useEffect(()=>{
        callAPI();
    },[])




    
  return (
    <div>
     <input onChange={onChangeForm}  value={title} name="title" placeholder='Title' size={80}/>
        <hr/>
        <textarea onChange={onChangeForm}  value={content} name="content" placeholder='Content' rows={10} cols={80}/>

      <button onClick={onSubmit} className='grayButton' >수정</button>
      <button className='grayButton'>취소</button>

        
    </div>
  )
}

export default BoardUpdate