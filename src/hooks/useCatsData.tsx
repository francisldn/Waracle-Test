import React,{useContext, createContext, useState, useEffect} from 'react'
import { getCats } from '../utils/apiService';

export interface Cat {
    id:string,
    imageURL: string,
    breedName: string,
    temperament: string,
    origin:string,
    lifeSpan:string,
    width: number,
    height:number,
    wikipediaUrl: string,
    score:number,
}

export interface CatApi {
    id:string,
    url:string,
    width:number,
    height:number,
    breeds:[{
        weight:string,
        temperament:string,
        origin:string,
        wikipedia_url:string,
        life_span:string,
        name:string
    }],
}

export interface CatsDataProps {
    catsData: Cat[],
    initialCatsData: Cat[],
    setCatsData:React.Dispatch<React.SetStateAction<Cat[]>>
}

// const initialCatsValue = [{
//     id:'',
//     imageURL: '',
//     breedName: '',
//     temperament: '',
//     origin:'',
//     lifeSpan:'',
//     width: 0,
//     height:0,
//     wikipediaUrl: '',
// }]

// initial value of cats
const CatsDataContext = createContext<CatsDataProps>({
    catsData: [],
    initialCatsData:[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setCatsData: () => {}
})

export default function CatsDataProvider({children}: {children: React.ReactNode}) {
    const [catsData, setCatsData] = useState<Cat[]>([])
    const [initialCatsData, setInitialCatsData] = useState<Cat[]>([])

    useEffect(() => {
        getCats()
        .then((data) => {
            const cats = data.map((cat:CatApi) => {
                return {
                    id:cat.id,
                    imageURL: cat.url,
                    breedName: cat.breeds[0].name,
                    temperament: cat.breeds[0].temperament,
                    origin:cat.breeds[0].origin,
                    lifeSpan:cat.breeds[0].life_span,
                    width: cat.width,
                    height:cat.height, 
                    wikipediaUrl: cat.breeds[0].wikipedia_url,
                }
            })
            if(cats) {
                setCatsData(cats);
                setInitialCatsData(cats)
            }
        })
        .catch((error) => console.log(error))
    },[])

    const value = {
        catsData,
        initialCatsData,
        setCatsData
    }

    return (
       <CatsDataContext.Provider value={value}>
        {children}
       </CatsDataContext.Provider>
    )
}

export function useCatsData() {
    return useContext(CatsDataContext)
    // if(id && data.catsData) {
    //     return data.catsData.find(cat => cat.id === id)
    // }
}

export function useCatData(id:string) {
    const {catsData} = useContext(CatsDataContext)
    return catsData.find(cat => cat.id === id)
}