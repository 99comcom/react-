import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import Pagination from "react-js-pagination";
import './Paging.css';
import qs from 'qs';
import Table from 'react-bootstrap/Table';
import BoardItem from './BoardItem';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

const reducer = (state, action)=>{
  switch(action.type){
    case 'CALL_API':
      return {
        ...state,
        list: action.payload.list,
        total: action.payload.total
      }
    default:
      return state;  
  }
}

let currentPath = "";


const initialState = {
  list: [],
  total: 0
}

const BoardList = ({location, history}) => {
  const search=qs.parse(location.search, {ignoreQueryPrefix:true});
  const page = !search.page ? 1:parseInt(search.page);


  const [state, dispatch] = useReducer(reducer, initialState);
  const [word, setWord] = useState(!search.word?'':search.word);

  const callAPI = async()=>{
    const result=await axios.get(`/board/list?page=${page}&word=${word}`);
    dispatch({
      type:'CALL_API', 
      payload: {
        list:result.data.list, 
        total:result.data.total
      }
    });
  }

  const onChangePage = (e) => {
    history.push(`/board/list?page=${e}&word=${word}`);
  }

  const onKeyDown = (e) => {
    if(e.keyCode === 13) {
      history.push(`/board/list?page=1&word=${e.target.value}`)
    } 
  }

  useEffect(()=>{
    console.log('rendering', `word:${word}`, `search.word:${search.word}`);
    callAPI();
   
  },[location]);

  if(!state.list) <h1>데이터를 불러오는 중입니다...</h1>
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
                Count <Badge bg="danger">{state.total}</Badge>
            </Button>
          </Col>  
        </Row>
      </Card>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>title</th>
            <th>Date</th>
            <th>Writer</th>
          </tr>
        </thead>
        <tbody>
          {state.list.map(board=>
            <BoardItem key={board.bno}  board={board}/>
          )}
        </tbody>
      </Table>
      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={state.total}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={onChangePage}/>
    </div>
  )
}

export default React.memo(BoardList);
