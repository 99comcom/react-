import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const callUsers = async() => {
    const result=await axios.get(`/api/user/list?page=${page}`);
    setUsers(result.data);
  }

  useEffect(()=>{
    callUsers();
  }, [page]);

  return (
    <div>

      <Table className='my-5'>
        <thead>
          <tr>
            <td>아이디</td>
            <td>이미지</td>
            <td>회원이름</td>
            <td>가입일</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user=>
            <tr key={user.uid}>
              <td>{user.uid}</td>
              <td>
                {user.photo ? 
                <img src={`/api/display?fileName=${user.photo}`} width={100}/>
                :
                <img src="/img01.png" width={100}/>
                }
              </td>
              <td>{user.uname}</td>
              <td>{user.joinDate}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination
        activePage={ page }
        itemsCountPerPage={5}
        totalItemsCount={ 15 }
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={(e)=>setPage(e)} />
    </div>
  )
}

export default UserPage