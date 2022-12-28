// import React, { useEffect, useState } from 'react'
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import Slider from 'react-slick';
// import axios from 'axios';
// import Card from 'react-bootstrap/Card';

// const SaleShop = () => {
//   const [shops, setShops] = useState([]);
  
//   const callgetSale= async()=> {
//     const result=await axios.get('/api/shop/getSale');
//     setShops(result.data);
//   }

//   useEffect(()=>{
//     callgetSale();
//   });

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 3
//   };

//   if(!shops) return <h1>Loading......</h1>
//   return (
//     <Slider {...settings}>
//       {shops.map(shop=>
//         <div>
//            <Card style={{ width: '18rem' }}>
//             <Card.Img variant="top" src={`/api/display?fileName=${shop.image}`} />
//            </Card> 
//         </div>
//       )}
//     </Slider>
//   )
// }

// export default SaleShop