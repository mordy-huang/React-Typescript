import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".";

interface GrobalState {
  isLogin:boolean;
  loginInfo:{userName:string};
  loginTime:string,
  loading:boolean
}

// Define the initial state using that type
const initialState: GrobalState = {
  isLogin:false,
  loginInfo:{userName:""},
  loginTime:'',
  loading:false
};

const validateAccount = createAsyncThunk("grobal/fetchById", async (userId: number, thunkAPI) => {
  const response = (await axios.get(`https://reqres.in/api/users/${userId}`)).data;
  return response;
});

const testMock = createAsyncThunk("grobal/test", async () => {
  const response = (await axios.get(`/user/test`)).data;
  return response;
});

// const validateAccount = createAsyncThunk("counter/fetchData", async () => {
//   const data = await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(1998);
//     }, 3000);
//   });
//   return data;
// });

export const GrobalSlice = createSlice({
  name: "grobal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLogin=true
    },
    loginout: (state) => {
      state.isLogin=false
    },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(validateAccount.pending, state => {
      state.loading = true;
    });
    builder.addCase(validateAccount.fulfilled, (state, action) => {
   
      state.loading = false;
        });



    builder.addCase(testMock.pending, state => {
      state.loading = true;
    });
    builder.addCase(testMock.fulfilled, state => {
      state.loading = false;
    });
    // builder.addCase(fetchUserById.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const user: User = action.payload.data;
    //   state.user = user;
    // });
  },
});

export const { login,loginout} = GrobalSlice.actions;
export { validateAccount,testMock};
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter;

export default GrobalSlice.reducer;
