import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div id="header">
        <Link to={"/"}>
    <img
      style={{ width: "60px", borderRadius: "15px" }}
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk50Ut-wJKwbca3BTPssDUl_fqnsEE_D2tcw&s"
      alt="Logo"
    /></Link>
    <p>Search Restaurant</p>
    <p>Search Dishes</p>
    <p>Cart</p>
  </div>

  )
}

export default Header