// import React, {useEffect, useState} from 'react'
// import './Chat.css';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import {db} from './firebase';
// import { ref, set, push, onValue} from 'firebase/database';

// const ChatPage = () => {
//     const [msg, setMsg] = useState('');
//     const [messages, setMessages] = useState([]);

//     const getMessage=()=>{
//         onValue(ref(db, 'chats/'),(snapshot)=>{
//             var rows=[];
//             snapshot.forEach(row=>{
//                 row.push({
//                     key: row.key,
//                     createdAt: row.val().createdAt,
//                     uid: row.val().uid,
//                     text: row.val().text
//                 })
//             });
//             setMessages(rows);
//         });
//     }
//     useEffect(()=>{
//         getMessage();
//     }, []);

//     if(!messages) return <h1>Loading......</h1>
//     return (
//         <>
//             <div className="wrap">
//                 {messages.map(message=>
//                     <div className="chat ch1">
//                         <div className="icon"><i className="fa-solid fa-user"></i></div>
//                         <div className="textbox">안녕하세요. 반갑습니다.</div>
//                     </div>
//                 )}
//             </div>


//             <div>
//                 <textarea placeholder='Enter for ....'/>
//             </div>
//         </>
//   )
// }

// export default ChatPage