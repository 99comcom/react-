import React, { useRef, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ShopInsert = ({history}) => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    file: null,
  });
  const {title, price, file} = form;
  const [image, setImage] = useState('https://dummyimage.com/200x200');

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const onChangeFile = (e) =>{
    //미리보기
    setImage(URL.createObjectURL(e.target.files[0]));
    setForm({
      ...form,
      file: e.target.files[0]
    })
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(!window.confirm('상품을 등록하실래요?')) return;
    const formData=new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('file', file);
    await axios.post("/api/shop/insert", formData);
    alert('상품등록 성공');
    history.push('/shop/list');
  }

  return (
    <div>
      <Card className="p-3">
        <Form onSubmit={onSubmit}>
          <Form.Control
            onChange={onChange}
            name="title"
            value={form.title}
            className="mt-3"
            placeholder='상품명'/>
          <Form.Control
            onChange={onChange}
            name="price"
            value={form.price}
            className="my-3"
            placeholder='상품가격'/>
          <img 
            src={image} width={200}/>
          <Form.Control 
            onChange={onChangeFile}
            type="file" className='my-3'/>
          <Button type="submit">상품등록</Button>  
        </Form>
      </Card>
    </div>
  )
}

export default ShopInsert