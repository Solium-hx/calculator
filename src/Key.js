import React from 'react'

function Keys({ className, value, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  )
}

export default Keys
