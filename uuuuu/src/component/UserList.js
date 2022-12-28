import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import Pagination from "react-js-pagination";
import './Paging.css';
import UserItem from './UserItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const UserList = ({history,location}) => {
    const search=qs.parse(location.search,{ignoreQueryPrefix:true});
    const searchWord=!search.word? '' : search.word;
    const page=!search.page? 1 : parseInt(search.page); 
    const[list,setList]=useState();
    const num=5;
    const [total,seTotal]=useState(0);
    const [word,setWord]=useState(searchWord);
    
    const callAPI=async()=>{
        const result=await axios.get(`/user/list?page=${page}&word=${searchWord}&num=${num}`)
        setList(result.data.list);
        seTotal(result.data.total);
    }
    const onchangePage=(e)=>{
        history.push(`/user/list?page=${e}&word=${searchWord}`);
        
    }

    const onKeyDown=(e)=>{
        if(e.keyCode===13){
            history.push(`/user/list?page=1&word=${e.target.value}`);
        }
    }

    useEffect(()=>{
        callAPI();
        setWord(searchWord);
    },[location])

    if(!list) return <h1>로딩 중...</h1> 
  return (
    <div>
       <Card className='my-3 p-2'>
        <Row>
          <Col md={4} xs={6}>
            <Form.Control 
              value={word}
              onChange={(e)=>setWord(e.target.value)}
              placeholder='검색어' 
              onKeyDown={onKeyDown}/>
          </Col>
          <Col md={8} xs={6}>
            <Button variant="primary">
                Count <Badge bg="danger">{total}</Badge>
            </Button>
          </Col>  
        </Row>
      </Card>

        {list.map(user=>
        <UserItem key={user.uid} user={user}/>)}

    <Pagination
        activePage={page}
        itemsCountPerPage={num}
        totalItemsCount={total}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={onchangePage}
        />
    </div>
  
  )
}

export default withRouter (UserList)