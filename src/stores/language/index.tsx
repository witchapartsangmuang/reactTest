import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

// Define a type for the slice state
interface languageState {
    languageList:string[],
    languageSelected:string

}

// Define the initial state using that type
const initialState: languageState = {
    languageList: ['EN','TH'],
    languageSelected:'EN'
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLng: (state,actions) => {
        state.languageSelected = actions.payload
    },
  },
})

export const { changeLng } = languageSlice.actions
export default languageSlice.reducer