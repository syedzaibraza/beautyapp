import React from 'react'
import './Button.css'

export default function Button({ className, title, light, onClick, AddToCart }) {
  return (
    <button
      className={className ? className : light ? 'button-light' : 'button-dark'}
      onClick={onClick || AddToCart}
    >
      {title}
    </button>
  )
}
