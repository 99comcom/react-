import React from 'react'

const TradeItem = ({trades}) => {
    const {ano,type,tno,famount,tradeDate,aname}=trades;
  return (
    <tr>
            <td>{tno} ({aname})</td>
            <td>{tradeDate}</td>
            <td>{type}</td>
            <td>{famount}</td>
    </tr>
  )
}

export default TradeItem