import React from 'react'
import './Header.css'

const Header = () => {
  const gototop = () => {
    window.scroll(0, 0);
  }
    return (
      <span onClick={gototop} className="header">filmflix</span>
    )
}

export default Header
