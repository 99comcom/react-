import React from 'react'
import { Link } from 'react-router-dom';

const ShopItem = ({shop,checkItems,onSingleCheck}) => {
    const {code,image,title,price}=shop;

  return (
    <tr>

        <td><input
        type='checkbox' 
        checked={checkItems.includes(code) ? true : false}
        onChange={(e)=>onSingleCheck(e.target.checked,code)}/></td>
        <Link to={`/shop/read/${code}`}><td>{code}</td></Link>
        <td><img src={`/api/display?fileName=${image}`} width={70}/></td>
        <td>{title}</td>
        <td>{price}</td>
    </tr>
  )
}

export default ShopItem