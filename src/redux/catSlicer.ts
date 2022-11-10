import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Cat, CatApi } from "../types/Cat"
import { getCats } from "../utils/apiService"

interface CatsDataState {
  initialCatsData: Cat[]
  catsData: Cat[]
  loading: boolean
  error: string
}

const initialState: CatsDataState = {
  initialCatsData: [] as Cat[],
  catsData: [] as Cat[],
  loading: false,
  error: "",
}

export const getCatsData = createAsyncThunk("cats/fetchCats", () => {
  return getCats().then((data) => data)
})

const catSlice = createSlice({
  name: "cat",
  initialState,
  reducers: {
    addVote: (state, action: PayloadAction<string>) => {
      state.catsData = state.catsData
        .map((cat) => {
          if (cat.id === action.payload) {
            cat.vote += 1
          }
          return cat
        })
        .sort((a, b) => b.vote - a.vote)
      state.initialCatsData = [...state.catsData]
    },
    reduceVote: (state, action: PayloadAction<string>) => {
      state.catsData = state.catsData
        .map((cat) => {
          if (cat.id === action.payload) {
            cat.vote -= 1
          }
          return cat
        })
        .sort((a, b) => b.vote - a.vote)
      state.initialCatsData = [...state.catsData]
    },
    searchCats: (state, action: PayloadAction<string>) => {
      if (!action.payload) state.catsData = [...state.initialCatsData]
      else
        state.catsData = [
          ...state.initialCatsData.filter((cat) =>
            cat.breedName.toLowerCase().includes(action.payload.toLowerCase()),
          ),
        ]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCatsData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getCatsData.fulfilled, (state, action: PayloadAction<CatApi[]>) => {
      state.catsData = action.payload
        .map((cat: CatApi) => {
          return {
            id: cat.id,
            imageURL: cat.url,
            breedName: cat.breeds[0].name,
            temperament: cat.breeds[0].temperament,
            origin: cat.breeds[0].origin,
            lifeSpan: cat.breeds[0].life_span,
            width: cat.width,
            height: cat.height,
            wikipediaUrl: cat.breeds[0].wikipedia_url,
            vote: 0,
          }
        })
        .sort((a, b) => b.vote - a.vote)

      state.initialCatsData = [...state.catsData]
      state.loading = false
    })
    builder.addCase(getCatsData.rejected, (state, action) => {
      state.loading = false
      state.catsData = []
      state.initialCatsData = []
      state.error = action.error.message || "Something went wrong"
    })
  },
})

export default catSlice.reducer
export const { addVote, reduceVote, searchCats } = catSlice.actions
