import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  api  from "../config/api";

export const getAllTweets = createAsyncThunk(
  "tweets/getAllTweets",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/tweets/");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch user tweets
export const getUsersTweet = createAsyncThunk(
  "tweets/getUsersTweet",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/api/tweets/user/${userId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch liked tweets
export const findTweetsByLikeContaineUser = createAsyncThunk(
  "tweets/findTweetsByLikeContaineUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/api/tweets/user/${userId}/likes`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch tweet by ID
export const findTweetsById = createAsyncThunk(
  "tweets/findTweetsById",
  async (tweetId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/api/tweets/${tweetId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a new tweet
export const createTweet = createAsyncThunk(
  "tweets/createTweet",
  async (tweetData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/api/tweets/create`,
        tweetData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Reply to a tweet
export const createTweetReply = createAsyncThunk(
  "tweets/createTweetReply",
  async (tweetData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/api/tweets/reply`,
        tweetData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Retweet
export const createReTweet = createAsyncThunk(
  "tweets/createReTweet",
  async (tweetId, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/api/tweets/${tweetId}/retweet`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Like a tweet
export const likeTweet = createAsyncThunk(
  "tweets/likeTweet",
  async (tweetId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/api/${tweetId}/likes`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a tweet
export const deleteTweet = createAsyncThunk(
  "tweets/deleteTweet",
  async (tweetId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/tweets/${tweetId}`);
      return tweetId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const tweetSlice = createSlice({
  name: "tweets",
  initialState: {
    loading: false,
    tweets: [],
    tweet: null,
    likedTweets: [],
    like: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(getAllTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      .addCase(getUsersTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(getUsersTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(findTweetsByLikeContaineUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(findTweetsByLikeContaineUser.fulfilled, (state, action) => {
        state.loading = false;
        state.likedTweets = action.payload;
      })
      .addCase(findTweetsByLikeContaineUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(findTweetsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(findTweetsById.fulfilled, (state, action) => {
        state.loading = false;
        state.tweet = action.payload;
      })
      .addCase(findTweetsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets.unshift(action.payload);
      })
      .addCase(createTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createTweetReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTweetReply.fulfilled, (state, action) => {
        state.loading = false;
        state.tweet = action.payload;
      })
      .addCase(createTweetReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createReTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweet = action.payload;
      })
      .addCase(createReTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(likeTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.like = action.payload;
      })
      .addCase(likeTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = state.tweets.filter(
          (tweet) => tweet.id !== action.payload
        );
      })
      .addCase(deleteTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tweetSlice.reducer;
