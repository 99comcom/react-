import React from 'react'

const oardItem = ({board}) => {
    const {bno,title,writer,regDae,uname}=board;

  return (
    <div>
<tr>
    <td>{bno}</td>
    <td>{title}</td>
    <td>{regDae}</td>
    <td>{uname} ({writer})</td>
</tr>

    </div>
  )
}

export default oardItem