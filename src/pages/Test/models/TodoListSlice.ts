import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { history, RootState } from "@/store/index";
import { ResponseBody, TodoItem } from "@/types";
import * as service from "@/services/toduList";
import { v4 as uuid } from "uuid";
interface ToduList {
  toduList: Array<TodoItem>;
  // loading:boolean,
  initialized: boolean;
}

// Define the initial state using that type
const initialState: ToduList = {
  toduList: [],
  // loading:false,
  initialized: false,
};

const getToduListData = createAsyncThunk("toduList/getToduListData", async (payload, thunkAPI) => {
  const response: ResponseBody<Array<TodoItem>> = (await service.getTudoList()).data;
  return response;
});

export const toduListSlice = createSlice({
  name: "toduList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToduList: (state, action: PayloadAction<TodoItem>) => {
      state.toduList = state.toduList.concat({ name: action.payload.name, id: uuid() });
    },
    updateToduList: (state, action: PayloadAction<TodoItem>) => {
      const index = state.toduList.findIndex(item => item.id === action.payload.id);
      state.toduList[index].name = action.payload.name;
    },
    deleteTodulist: (state, action: PayloadAction<string>) => {
      state.toduList = state.toduList.filter(item => item.id !== action.payload);
    },
    reset: () => {
      return initialState;
    },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    // login: (state, action: PayloadAction<string>) => {
    //   state.isLogin=true
    // },
    // loginout: (state) => {
    //   state.isLogin=false
    // },
  },
  extraReducers: builder => {
    builder.addCase(getToduListData.pending, state => {
      state.initialized = false;
    });
    builder.addCase(getToduListData.fulfilled, (state, action) => {
      state.initialized = true;
      state.toduList = action.payload.data;
    });
    // builder.addCase(fetchUserById.pending, state => {
    //   state.loading = true;
    // });
    // builder.addCase(fetchUserById.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const user: User = action.payload.data;
    //   state.user = user;
    // });
  },
});

export const { addToduList, updateToduList, deleteTodulist, reset } =
  toduListSlice.actions;
export { getToduListData };
// Other code such as selectors can use the imported `RootState` type
export const selecToduList = (state: RootState) => state.toduList;

export default toduListSlice.reducer;
