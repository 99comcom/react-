import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import Header from './Header'


const HomePage = () => {
  const {setBackground}=useContext(ThemeContext);


  useEffect(()=>{
    setBackground('primary'); 
   },[])
  return (
    <div>

    </div>
  )
}

export default HomePage