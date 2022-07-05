import React from 'react'
import { Carousel } from 'react-bootstrap'

import './Crousel.css'

export default function Crousel({ crouselData }) {
  return (
    <Carousel dark='true' fade interval={2000}>
      {crouselData?.map((crouselItem) => (
        <Carousel.Item>
          <img
            className='d-block w-100 crousel-image'
            src={crouselItem.img}
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>{crouselItem?.label}</h3>
            <p>{crouselItem?.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
