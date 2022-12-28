import axios from 'axios';
import React, { useState } from 'react'

const ProductInsert = ({history}) => {
    const [form,setForm]=useState({
        pname:"스너글 초고농축 섬유유연제 허거블 코튼 본품",
        price: 19000,
        file:null,
        fileName:''
    })

    const{pname,price,file,fileName}=form;
    const onChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const onChangeFile=(e)=>{
        setForm({
            ...form,
            file:e.target.files[0],
            fileName:e.target.value
        })
    }
    const onSubmit=async(e)=>{
        e.preventDefault();
        if(!window.confirm('새로운 상품을 등록하시겠습니까?'))return;
        const formData=new FormData();
        formData.append("pname",pname);
        formData.append("price",price);
        formData.append("file",file);
        const config={
            headers:{'content-type':'multipart/form-data'}
        }
        await axios.post(`/product/insert`,formData,config);
        alert('등록이 완료되었습니다.')
        history.push(`/product/list`)
    }
  return (

    <div>
        <form onSubmit={onSubmit}>
            <input 
            onChange={onChange}
            value={pname}
            name="pname"/>
            <hr/>
            <input 
            onChange={onChange}
            value={price}
            name="price"/>
            <hr/>
            <input
            onChange={onChangeFile}
             type="file" 
             name="file"/>
            <hr/>
            <button onSubmit={onSubmit}>상품등록</button>
        </form>
    </div>
  )
}

export default ProductInsert