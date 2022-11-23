import { testMockData } from "@/services/user";
import { GrobalState, LoginAccount, LoginInfo, ResponseBody } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".";
import { push } from "react-router-redux";

// Define the initial state using that type
const initialState: GrobalState = {
  isLogin: false,
  loginInfo: { username: "", loginTime: "", avator: "" },
  loading: false,
};
type GrobalStateKeys = keyof GrobalState;

const validateAccount = createAsyncThunk(
  "grobal/validateAccount",
  async (data: LoginAccount, { dispatch, getState, extra, requestId, signal }) => {
    dispatch(setState({ loading: true }));
    const response: ResponseBody<LoginInfo> = (
      await axios.post(`/user/validateAccount`, {
        username: data.username,
        password: data.password,
      })
    ).data;
    if(response.success){
      dispatch(setState({ loginInfo: response.data }));
      dispatch(setState({ isLogin: true }));
      dispatch(setState({ loading: false }));
      dispatch(push("/home"))
    }else{
      alert(response.msg)
    }
  }
);
const testMock = createAsyncThunk("grobal/test", async (data: LoginAccount, thunkAPI) => {
  const response = (await testMockData()).data;
  return response;
});
export const GrobalSlice = createSlice({
  name: "grobal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<any>) => {
      const newData = action.payload;
      Object.keys(newData)
        .filter(k => k !== "type")
        .forEach(k => {
          state[k as keyof GrobalState] = newData[k];
        });
    },
    reset: state => {
      state = initialState;
    },
    login: (state, action: PayloadAction<string>) => {
      state.isLogin = true;
    },
    logout: state => {
      console.log(initialState,"initialState");
      
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(testMock.pending, state => {
      state.loading = true;
    });
    builder.addCase(testMock.fulfilled, (state, action) => {
      console.log(action.payload, "action.payload");
      state.loading = false;
    });

    // builder.addCase(validateAccount.pending, state => {
    //   state.loading = true;
    // });
    // builder.addCase(validateAccount.fulfilled,(state,{payload}) => {
    //   if(payload.success){
    //     state.loginInfo=payload.data;
    //     state.isLogin = true;
    //     push("/home")
    //   }
    //   state.loading = false;
    // });
    // builder.addCase(fetchUserById.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const user: User = action.payload.data;
    //   state.user = user;
    // });
  },
});

export const { login, logout, setState } = GrobalSlice.actions;
export { validateAccount, testMock };
// Other code such as selectors can use the imported `RootState` type
export const selectGlobal = (state: RootState) => state.global;

export default GrobalSlice.reducer;
