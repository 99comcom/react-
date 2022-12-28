import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Row } from 'react-bootstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import { async } from '@firebase/util';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

const ShopRead = ({history,match}) => {
    const code = match.params.code;
    const {title, image,price,content, file}=shop;
    const [shop,setShop]=useState({
        code:code,
        title:'',
        price:0,
        file:null,

    });




    const callShop=async()=>{
        const result=await axios.get(`/api/shop/read?code=${code}`)
        setShop({
            ...result.shop,
            content:!content? '' : result.data.content
        })
        setShop(result.config.data);
    }
    const onChange=(e)=>{
        setShop({
            shop,
            [e.target.name]:e.target.value
        })
    }
    const onChangeFile=(e)=>{
        setShop({
            ...shop,
            file:e.target.files[0],
            image:URL.createObjectURL(e.target.files[0])
        })
    }
    const onChangeContent=(e)=>{
        setShop({
            ...shop,
            content:e
        })
       
    }
    const onSubmit=async()=>{
        if(!window.confirm('상품을 수정하시겠습니까?')) return;
        const formData=new FormData();
        formData.append("file",file);
        formData.append("code",code);
        formData.append("title",title);
        formData.append("price",price);
        formData.append("image",image);
        formData.append("content",content);
        await axios.post(`/api/shop/update`,formData);
        alert('수정완료')
        history.push('/');
    }
    useEffect(()=>{
        callShop();

    },[])
    if(!shop) return <h1>Loading...</h1>
  return (
    <div>
    <Row className="d-flex justify-content-conter">
      
      <Card   style={{width:'15rem', margin:10, padding:5}}>
                <Form>
                    <Form.Control className='my-3'
                    onChange={onChange}
                    value={title}
                    name={title}

                    placeholder='상품명'/>

                    <Form.Control
                    onChange={onChange}
                     value={price}
                     name={price}
                     type="number"
                    placeholder='가격'/>

                    <img src='' width={200}
                    value={image}/>

                    <Form.Control
                    onChange={onChangeFile}
                    type="file"
                    />
                    <hr/>
                    <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onBlur={(e, editor)=>onChangeContent(editor.getData())}
                    config={
                        CKFinder ={uploadUrl:'/ckupload?code='+code}

                    }
                    />
                    <Button style={{width:'100%'}} onSubmit={onSubmit}>상품정보 수정</Button>


                </Form>
            </Card>
        </Row>
    </div>
  )
}

export default ShopRead