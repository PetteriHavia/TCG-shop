import { createSlice } from "@reduxjs/toolkit";


const filterSlice = createSlice({
  name: "filters",
  initialState: {
    availability: false,
    type: [],
    rarity: [],
    status: [],
  },
  reducers: ({
    setAvailability: (state, action) => {
      state.availability = action.payload
    },
    setType: (state, action) => {
      if (state.type.includes(action.payload)) {
        state.type = state.type.filter((item) => item !== action.payload)
      } else {
        state.type = [...state.type, action.payload]
      }
    },
    setRarity: (state, action) => {
      if (state.rarity.includes(action.payload)) {
        state.rarity = state.rarity.filter((item) => item !== action.payload)
      } else {
        state.rarity = [...state.rarity, action.payload]
      }
    },
    setStatus: (state, action) => {
      if (state.status.includes(action.payload)) {
        state.status = state.status.filter((item) => item !== action.payload)
      } else {
        state.status = [...state.status, action.payload]
      }
    }
  })
})

export const { setAvailability, setRarity, setType, setStatus } = filterSlice.actions;
export default filterSlice.reducer