import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BoardItem from './BoardItem';

const BoardList = () => {
  const [list, setList] = useState();
  
  const callAPI = async() => {
    const result = await axios.get('/api/board/list');
    setList(result.data);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  if(!list) return <h1>Loading...</h1>
  return (
    <div>
      <table>
        <tbody>
        {list.map(board=>
          <BoardItem key={board.bno} board={board}/>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default BoardList