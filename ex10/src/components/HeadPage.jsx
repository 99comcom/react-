import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const HeadPage = ({history}) => {
    const onClickLogout=(e)=>{
        e.preventDefault();
        sessionStorage.removeItem('uid')
        history.push('/');
    }
  return (
    <div>
        <div className='main_menu'>
            <Link to="/">홈</Link>
            <Link to="/board/list">게시판관리</Link>
            <Link to="/message">메세지</Link>

    

{!sessionStorage.getItem('uid') ?
        <Link to="/login" style={{float:'right' , fontSize:'15px'}}>Login</Link>
        :
        <div style={{float:'right' , fontSize:'15px'}}>
        <span>{sessionStorage.getItem('uid')} 님</span><br></br>
        <Link to="/" style={{float:'right' , fontSize:'15px'}} onClick={onClickLogout}>Logout</Link>
        
        </div>
        }



      </div>
      <hr/>
    </div>
  )
}

export default withRouter(HeadPage)