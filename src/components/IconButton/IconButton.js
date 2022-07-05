import React from 'react'

import './IconButton.css'

export default function IconButton({ icon, onClick, disabled }) {
  return (
    <div
      onClick={disabled ? () => {} : onClick}
      className={disabled ? 'icon-btn-disabled' : 'icon-btn'}
    >
      {icon}
    </div>
  )
}
