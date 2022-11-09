import React from "react"
import { Cat } from "../types/Cat"
import { useAppDispatch } from '../redux/store';
import {  addVote, reduceVote } from '../redux/catSlicer'

interface Props {
    cat: Cat
}

export default function CardItem({cat}:Props) {
  const dispatch = useAppDispatch()
  const {id, imageURL, breedName, temperament, origin, lifeSpan, wikipediaUrl, vote} = cat
  return (
    <div className="flex flex-col rounded-xl w-[90%] mx-auto overflow-hidden border-gray-300 border-2 shadow-gray-800 mb-4 box-effect">
        <div className="overflow-hidden h-[300px] img-area">
            <span></span>
            <img src={imageURL} alt="" className="w-full h-full object-cover"/>
        </div>
        <div className="flex pt-4 pr-6">
            <h3 className="text-2xl font-medium leading-8 px-6 flex-1">Breed: {breedName}</h3>
            <div className="flex gap-4">
              <div onClick={()=> dispatch(addVote(id))} className="w-8 h-8">
                <img src="thumbsup.png" alt="" className="w-full h-full"/>
              </div>
              <div onClick={()=> dispatch(reduceVote(id))} className="w-8 h-8">
                <img src="thumbsdown.png" alt="" className="w-full h-full"/>
              </div>
              <p className="text-xl">
                {vote}
              </p>
            </div>
        </div>
           
        <div className="flex gap-2 mx-6 my-4 flex-wrap">
            {temperament.split(',').map(el => <div key={el} className="bg-[#dbe4ff] text-xl rounded-2xl px-2 py-1 border-[1px] border-black">{el}</div>)}
        </div>
        <p className=" px-6 text-xl pb-3 text-slate-500">Origin: {origin}</p>
        <p className="px-6 text-xl pb-5 text-slate-500">Life span: {lifeSpan}</p>
        <a href={wikipediaUrl} target="_blank" rel="noopener noreferrer" className="px-6 text-xl pb-2 text-blue-500 font-semibold">Learn more</a>
    </div>
  )
}
