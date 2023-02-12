import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

export const Context = React.createContext(null)

export const initialState = {
  loginCurrentKey: 'login',
  userId: '',
  renewModalData: {
    visible: false,
    level: 0
  },
  upgradeModalData: {
    visible: false
  },
  modifyPayData: {
    visible: false,
    aliPayId: ''
  }
}

export const reduxSlice = createSlice({
  name: 'reduxSlice',
  initialState,
  reducers: {
    setLoginCurrentKey: (state, { payload }) => {
      state.loginCurrentKey = payload
    },
    setUserId: (state, { payload }) => {
      state.userId = payload
    },
    setRenewModalData: (state, { payload }) => {
      state.renewModalData = payload
    },
    setUpgradeModalData: (state, { payload }) => {
      state.upgradeModalData = payload
    },
    setModifyPayData: (state, { payload }) => {
      state.modifyPayData = payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLoginCurrentKey, setUserId, setRenewModalData, setUpgradeModalData, setModifyPayData } = reduxSlice.actions

// redux-thunk actions
// 拉取是否开通接口
// export const getIsOpen =
//   (query = {}) =>
//   async (dispatch) => {
//     const res = await Apis.getIsOpen(query).catch((err) => {
//       console.log('getIsOpen err', err)
//     })
//     const isOpen = res?.data ?? false
//     dispatch(setIsOpen(isOpen))
//   }

// 数据配置：拉取数据配置列表
// export const getDataTableList = (params) => async (dispatch) => {
//   const res = await Apis.getDataTableList(params).catch((err) => {
//     console.log('getDataTableList err', err)
//     return []
//   })
//   return res?.data
// }

// Reducer
export default reduxSlice.reducer
