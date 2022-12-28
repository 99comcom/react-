import React from 'react'
import { Link } from 'react-router-dom'

const BoardItem = ({board}) => {
  const {bno, title, replycnt, viewcnt} = board
  return (
    <tr>
      <td width={100}>{bno}</td>
      <td width={300}><Link to={`/board/read/${bno}`}>{title}</Link></td>
      <td width={100}>{replycnt}</td>
      <td width={100}>{viewcnt}</td>
    </tr>
  )
}

export default BoardItem