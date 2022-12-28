import React, { useRef, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
const ShopInsert = ({history}) => {
    /* const refTitle = useRef(null); */
    const [image,setImage]=useState('https://dummyimage.com/200x200');
    const [form, setForm] = useState({
        title: '',
        price: '',
        file:null,
        fileName:''
        /*   content: '<h1>안녕하세요</h1>' */
    });

    const {title,price,file}=form;

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    /*     const onChangeContent = (e) => {
            setForm({
                ...form,
                content: e
            })
        } 
     */
    
    const onSubmit = async(e) => {
        e.preventDefault();
        if(!window.confirm('정말로 등록하시겠습니까?'))return; 
        const formData=new FormData();
        formData.append('title',title);
        formData.append('price',price);
        formData.append('file',file);
        await axios.post('/api/shop/insert',formData);
        //CKEditor는 submit 할 때 tag가 들어가게 되는 것.
        alert('상품등록 성공')
        history.push('/shop/list')
    }

    const onChangeFile = (e) => {
        //미리보기. reader onload보다 훨씬 더 간단해진 코드. 지금은 state변수긴한데 
        //userRef써서 한번 구현해보자.
      setImage(URL.createObjectURL(e.target.files[0]));
      setForm({
        ...form,
        file:e.target.files[0]
      })
    }

    return (
        <div>
            <Card className='p-3'>
                <Form onSubmit={onSubmit}>
                    <Form.Control
                        value={form.title}
                        className='mt-3'
                        placeholder='상품명'
                        name='title'
                        onChange={onChangeForm} />
                    <Form.Control
                        value={form.price}
                        className='mt-3'
                        placeholder='가격'
                        name='price'
                        onChange={onChangeForm} />
                    {/* <CKEditor
                        editor={ClassicEditor}
                        //data가 위의 value 와 동일한 것.
                        data={form.content}
                        //e를 뺴면 event를 못받아서 data가 안나옴.
                        onChange={(e,editor)=>onChangeContent(editor.getData())} /> */}
                    <img /* ref={refTitle} */ src={image} alt='빈칸' width={200} />
                    <Form.Control
                        
                        type="file"
                        name='file'
                        className='my-3'
                        onChange={onChangeFile} />
                    <Button type='submit'>상품등록</Button>
                </Form>
            </Card>
        </div>
    )
}

export default ShopInsert