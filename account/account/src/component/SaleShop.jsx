import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { Card } from 'react-bootstrap';


const SaleShop = () => {
    const [shops, setShops] = useState([]);

    const callgetSale = async () => {
        const result = await axios.post(`/api/shop/getSale`)
        setShops(result.data);
    }

    useEffect(() => {
        callgetSale();
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    if (!shops) <h1>데이터를 불러오는 중입니다.</h1>

    return (
        <Slider {...settings}>
            {shops.map(shop => 
            // div 대신 card로 넣는 게 더 예쁨.
            <Card>
                <img src={`/api/display?fileName=${shop.image}`}
             alt="빈이미지" 
             width={200} height={200}/>
             <span style={{fontSize:50}}>{shop.title}</span>
             </Card>)}
        </Slider>
    )
}

export default SaleShop