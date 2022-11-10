import React from "react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row mx-auto mt-10 w-screen'>
      <div className='mx-auto w-32 h-28 md:ml-8'>
        <Link to={"/"}>
          <img src='cat-logo.png' alt='logo' className='h-full w-full' />
        </Link>
      </div>
      <SearchBar />
    </div>
  )
}

export default Header
