import React, { useState } from "react"
import { useAppDispatch } from "../redux/store"
import { searchCats } from "../redux/catSlicer"

export default function SearchBar() {
  const [value, setValue] = useState("")
  const dispatch = useAppDispatch()

  const handleChange = (text: string) => {
    setValue(text)
    dispatch(searchCats(text))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(searchCats(value))
  }

  return (
    <div className='flex flex-col w-screen ml-10 items-center'>
      <form
        className='flex border-2 rounded-3xl h-14 items-center pl-4 w-[95%] self-start mt-4 overflow-hidden'
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className='w-7 h-7'>
          <img src='search.png' alt='' className='w-full h-full' />
        </div>
        <input
          type='text'
          placeholder='Search by breed, eg: Bengal'
          className='pl-5 text-xl flex-1 h-full'
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
      </form>
    </div>
  )
}
