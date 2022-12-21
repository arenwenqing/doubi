import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

export const Context = React.createContext(null)

export const initialState = {
  viewModal: {
    visible: false,
    type: 'tong'
  },
  detailModal: {
    visible: false
  },
  lotteryModal: {
    visible: false,
    num: 0
  }
}

export const reduxSlice = createSlice({
  name: 'reduxSlice',
  initialState,
  reducers: {
    // support Immer
    setViewModal: (state, { payload }) => {
      state.viewModal = payload
    },
    setDetailModal: (state, { payload }) => {
      state.detailModal = payload
    },
    setLotteryModal: (state, { payload }) => {
      state.lotteryModal = payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setViewModal,
  setDetailModal,
  setLotteryModal
} = reduxSlice.actions

// Reducer
export default reduxSlice.reducer
