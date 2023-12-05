import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
};

const initialState: CounterState = {
  value: 1
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    add: (state) => {
      if(state.value + 1 > 1008){
        return state;
      }
      state.value += 1;
    },
    decrement: (state) => {
      if(state.value < 2){
        return state;
      }
      state.value -= 1;
    },
    addByAmount: (state, action: PayloadAction<number>) => {
      if(state.value + action.payload > 1008){
        state.value = 1008;
        return;
      }
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
       if(state.value - action.payload < 2){
        state.value = 1;
        return;
      }
      state.value -= action.payload;
    },
    reset: (state) => {
      state.value = initialState.value;
    }
  }
});

export const {add, decrement, reset, addByAmount, decrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;