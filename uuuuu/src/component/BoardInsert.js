import axios from 'axios';
import React, { useRef, useState } from 'react'

const BoardInsert = ({history}) => {
  const refTitle = useRef();
  const [form, setForm] = useState({
    title:'',
    content:'',
    writer:sessionStorage.getItem('uid')
  });
  const {title, content} = form;
  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  }
  const onSubmit = async() => {
    if(title==='') {
      alert('Please Enter Title...');
      refTitle.current.focus();
      return;
    }
    await axios.post('/board/insert', form);
    history.push('/board/list');
  }

  return (
    <div>
      <input 
        onChange={onChangeForm}
        value={title}
        name="title" 
        placeholder='Title' 
        size={80}
        ref={refTitle}/>
      <hr/>
      <textarea 
        onChange={onChangeForm}
        value={content}
        name="content" 
        placeholder='Content' 
        rows={10} 
        cols={80}/>
        <button 
          onClick={onSubmit}
          className='grayButton'>Register</button>
        <button className='grayButton'>Reset</button>
    </div>
  )
}

export default BoardInsert