import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Button, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const callUsers = async () => {
        const result = await axios.get(`/api/user/list?page=${page}`);
        setUsers(result.data);
    }


    useEffect(() => {
        callUsers();
    }, [page])

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <td>아이디</td>
                        <td>이름</td>
                        <td>프로필</td>
                        <td>가입일</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.uid}>
                            <td>{user.uid}</td>
                            <td>{user.uname}</td>
                            <td>{user.photo ?
                                <img src={`/api/display?fileName=${user.photo}`} alt="빈이미지" width={80} height={80} /> :
                                <img src="https://dummyimage.com/80x80" />}
                            </td>
                            <td>{user.joinDate}</td>
                        </tr>)
                    }
                </tbody>
            </Table>
            <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={15}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(e) => setPage(e)} />
        </div>
    )
}

export default UserPage