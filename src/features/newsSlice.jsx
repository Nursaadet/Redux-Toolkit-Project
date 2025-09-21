import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  newsData: [],
  loading: false,
  error: false,
}

export const getNews = createAsyncThunk(
  "getNews", //? action type
  async () => {
    //? api istek fonksiyonu
    const API_KEY = "8b6cc7d0ec5849dba4b1b5f1b88b034c"
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    const { data } = await axios(url)
    console.log(data.articles)
    return data.articles
  }
)

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    
  },
})

export const {} = newsSlice.actions

export default newsSlice.reducer