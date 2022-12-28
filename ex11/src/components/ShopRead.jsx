import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ShopRead = ({match, history}) => {
  const code=match.params.code;
  const [shop, setShop] = useState('');
  const [images, setImages] = useState([]);
  const [attfiles, setAttFiles] = useState([]);
  const [attImages, setAttImages] = useState([]);

  const onChangeFiles = (e)=>{
    //이미지들 미리보기
    const files=e.target.files;
    const arrFiles = [];
    for(let i=0; i<files.length; i++){
      arrFiles.push(URL.createObjectURL(files[i]));
    }
    setImages(arrFiles);
    setAttFiles(files);
  }

  const callGetAttach = async()=>{
    const result = await axios.get(`/api/shop/getAttach?code=${code}`);
    setAttImages(result.data);
    console.log(result.data);
  }

  const onClickAttach = async() =>{
    const formData = new FormData();
    formData.append("code", code);
    for(let i=0; i<attfiles.length; i++){
      formData.append("files", attfiles[i]);
    }
    await axios.post('/api/shop/addAttach', formData);
    alert('첨부파일 업로드성공!');
    callGetAttach();
    setImages([]);
  };

  const callShop = async()=>{
    const result=await axios.get(`/api/shop/read/${code}`);
    setShop(result.data);
  }

  const onClickDel = async(id, image)=>{
    if(!window.confirm(`${id}:${image} 이미지를 삭제하실래요?`)) return;
    await axios.post(`/api/shop/delAttach?id=${id}&image=${image}`);
    callGetAttach();
  }

  useEffect(()=>{
    callShop();
    callGetAttach();
  }, []);

  if(!shop || !attImages) return <h1>Loading......</h1>
  return (
    <div>
      <Card className="p-3 my-3">
        <Form.Control className="my-2"
          value={shop.code} disabled={true}/>
        <Form.Control className="my-2"
          value={shop.title} disabled={true}/>  
        <Form.Control className="my-2"
          value={shop.price} disabled={true}/>
        <img
          src={`/api/display?fileName=${shop.image}`} width={200}/>
        <hr/>
        <div className='images'>
          {attImages.map(img=>
            <>
              <span className='img'>
                <img key={img.id} 
                  src={`/api/display?fileName=${img.image}`} width={100}/>
                <span
                  onClick={()=>onClickDel(img.id, img.image)} 
                  className='del'>x</span> 
              </span> 
            </>
          )}
        </div>
        <hr/>
        <Form.Group>
          <Form.Label>첨부파일선택</Form.Label>
          <Row>
            <Col>
              <Form.Control 
                onChange={onChangeFiles}
                type="file" multiple/>
            </Col>
            <Col>
              <Button onClick={onClickAttach}>파일등록</Button>
            </Col>
          </Row>
        </Form.Group>   
        <hr/>   
        <div className='images'>
          {images.map(img=>
            <img className="img" key={img} src={img} width={50}/>
          )}
            
        </div>          
      </Card>
      <Button onClick={()=>history.go(-1)}>상품목록</Button>
    </div>
  )
}

export default ShopRead