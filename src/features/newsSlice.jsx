import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newsData: [],
  loading: false,
  error: false,
};

export const getNews = createAsyncThunk(
  "getNews",
  async () => {
    const API_KEY = "d54f71fb016a0fbcdc4cd278062c4498";

    const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${API_KEY}`;

    const { data } = await axios(url);

    console.log(data.articles);

    return data.articles;
  }
);
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNewsData: (state) => {
      state.newsData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.newsData = payload;
      })
      .addCase(getNews.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { clearNewsData } = newsSlice.actions;

export default newsSlice.reducer;
