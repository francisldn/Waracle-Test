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
    vote:number,
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