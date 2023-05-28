import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

// Define a type for the slice state
interface formSelectorState {
  phoneCodeList: { id: string, maxlength: number, pfix: string }[],
  prefixList: string[],
  nationalityList: string[]
}

// Define the initial state using that type
const initialState: formSelectorState = {
  phoneCodeList: [
    { id: '+66', maxlength: 9, pfix: '0' },
    { id: '+886', maxlength: 8, pfix: '10' }
  ],
  prefixList: ['Mr.', 'Ms.', 'Miss.'],
  nationalityList: ['Thai', 'Chinese', 'American']
}

export const formSelectorSlice = createSlice({
  name: 'formSelector',
  initialState,
  reducers: {
    // increment: (state) => {
    // },
    // decrement: (state) => {
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    // },
  },
})

// export const { increment, decrement, incrementByAmount } = formSelectorSlice.actions
export default formSelectorSlice.reducer