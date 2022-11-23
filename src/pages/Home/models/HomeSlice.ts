import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { history, RootState } from "@/store/index";
import axios from "axios";
// Define a type for the slice state
interface User {
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}
interface CounterState {
  value: number;
  loading: boolean;
  user: User;
  isLogin:boolean
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  loading: false,
  user: { avatar: "", email: "", first_name: "", last_name: "" },
  isLogin:false
};

const fetchUserById = createAsyncThunk("counter/fetchById", async (userId: number, thunkAPI) => {
  const response = (await axios.get(`https://reqres.in/api/users/${userId}`)).data;
  return await response;
});
const fetchData = createAsyncThunk("counter/fetchData", async () => {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1998);
    }, 3000);
  });
  return data;
});

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    login: (state, action: PayloadAction<string>) => {
      state.isLogin=true
    },
    loginout: (state) => {
      state.isLogin=false
    },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchData.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      // const data = history.location.pathname;
      // console.log(data);
      
      // Add user to the state array
      state.loading = false;
      state.value = action.payload as number;
    });

    builder.addCase(fetchUserById.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      const user: User = action.payload.data;
      state.user = user;
    });
  },
});

export const { increment, decrement, incrementByAmount,login,loginout} = counterSlice.actions;
export { fetchData, fetchUserById };
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter;

export default counterSlice.reducer;
