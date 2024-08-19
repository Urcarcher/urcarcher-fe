import React from 'react';
import { Link } from 'react-router-dom';

function ServiceList () {

    const services = [
        {
          name: "환율 조회",
          imgSrc: "/img/home/service1.png",
          link: "/",
        },
        {
          name: "환전하기",
          imgSrc: "/img/home/service2.png",
          link: "/exchange",
        },
        {
          name: "관광 명소",
          imgSrc: "/img/home/service3.png",
          link: "/",
        },
        {
          name: "여행코스",
          imgSrc: "/img/home/service4.png",
          link: "/courseList",
        },
    ];
    return (
        <ul className='service-list'>
        {services.map((service, index) => (
          <li key={index}>
            <Link to={service.link}>
              <img src={service.imgSrc} alt={service.name} />
              <p>{service.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    );
}

export default ServiceList ;