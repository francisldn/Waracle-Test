import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"
import CardItem from "./CardItem"
import { getCatsData } from "../redux/catSlicer"
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./ErrorFallBack";

export default function CardList() {
  const cats = useAppSelector((state) => state.cat)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCatsData())
  }, [])
  console.log({error: cats.error})

  return (
      <main
        className={`${
          cats.loading || cats.error
            ? "flex justify-center"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 mt-8"
        }`}
      >
        {cats.error && <ErrorFallBack />}
        {cats.loading && (
          <div>
            <img src='loading.gif' alt='loading' />
          </div>
        )}
        {!cats.loading &&
          cats.catsData &&
          cats.catsData.map((cat) => <CardItem key={cat.id} cat={cat} />)}
      </main>
  )
}
