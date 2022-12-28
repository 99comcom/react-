import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';

const ShopRead = ({ match, history }) => {
    const code = match.params.code;
    const [shop, setShop] = useState({});
    const [images,setImages]=useState([]);
    const [attfiles,setAttFiles]=useState([]); //여러개니까 배열
    const [attImages,setAttImages]=useState([]);
    const callShop = async () => {
        const result = await axios.get(`/api/shop/read/${code}`)
        setShop(result.data);
    }

    useEffect(() => {
        
        callShop();
        callGetAttach();
    }, [])

    const onChangeFiles=(e)=>{
        const files=e.target.files; //아까는 [0]번쨰였지만 지금은 전부 다 받아오면 됨. 위에도
        //files라는 state 변수가 있지만 
        const arrFiles=[];
        //아래는 files임. arrFiles로 하면 빈배열의 갯수만큼 반복이니 0개 반복이라 아무 이미지도 못봄.
        for(let i=0;i<files.length;i++){
            arrFiles.push(URL.createObjectURL(files[i])
            )
            setImages(arrFiles);
            setAttFiles(files);
        }
    }

    const callGetAttach=async()=>{
        const result=await axios.get(`/api/shop/getAttach?code=${code}`)
        setAttImages(result.data);
    }

    
    const onClickAttach=async()=>{
        const formData=new FormData();
        formData.append("code",code);
        for(let i=0;i<attfiles.length;i++){
            formData.append("files",attfiles[i]);
        }
        
        await axios.post('/api/shop/addAttach',formData);
        alert('첨부파일이 성공적으로 등록되었습니다.')
        callGetAttach();
       setImages([]);
        
    }

    const onClickdel=async(id,image)=>{
        alert(`${id}번 ${image}를 지우시겠습니까?`);
        await axios.post(`/api/shop/delAttach?id=${id}&image=${image}`)
        callGetAttach();
    }

    if (!shop || !attImages) <h1>데이터를 불러오는 중입니다.</h1>


    return (
        <div className=''>
            <Card>
                <Form.Control className='my-3'
                    value={shop.code} disabled={true} />
                <Form.Control className='my-3'
                    value={shop.code}  disabled={true} />
                <Form.Control className='my-3'
                    value={shop.title} disabled={true} />
                <Form.Control className='my-3'
                    value={shop.price}  disabled={true}/>
                <img
                    src={`/api/display?fileName=${shop.image}`} width={200} />
                <Form.Group>
                    <Form.Label>첨부파일 선택</Form.Label>
                    <Form.Control 
                    type='file' 
                    onChange={onChangeFiles} multiple />
                </Form.Group>
                <hr/>
                <div className='images'>
                    {attImages.map(img=>
                    <>
                    <span className='img'>
                    <img src={`/api/display?fileName=${img.image}`} key={img.id} width={200} height={100}/>
                    <span onClick={()=>onClickdel(img.id,img.image)}
                    className='del'>X</span>
                    </span>
                    </>)}
                </div>
                <div>
                    {images.map(img=><img key={img} src={img} width={200}/>)}
                    <Button onClick={onClickAttach}>파일등록</Button>
                </div>
            </Card>
            <Button onClick={() => history.go(-1)}>목록으로</Button>
        </div>
    )
}

export default ShopRead