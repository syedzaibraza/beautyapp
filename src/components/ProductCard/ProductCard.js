import React from 'react'
import Button from '../Button/Button'
import './ProductCard.css'

export default function ProductCard({ img, onClick, AddToCart }) {
  return (
    <div className='product-card'>
      <img src={img} alt='Avatar' className='product-img' />
      <div className='card-buttons'>
        <Button title='Add To Cart' AddToCart={AddToCart} />
        <Button title='View Details' light onClick={onClick} />
      </div>
    </div>
  )
}
