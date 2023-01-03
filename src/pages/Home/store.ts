import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { Toast } from 'antd-mobile'
import Apis from 'src/apis'

interface LotteryType {
  userId: string
  keyInfo: {
    keyType: number
    keyCount: number
  }
}
export const Context = React.createContext(null)

export const initialState = {
  viewModal: {
    visible: false,
    type: 3
  },
  detailModal: {
    visible: false
  },
  lotteryModal: {
    visible: false,
    currentBoxType: 3,
    lotteryDataSource: {}
  },
  keyInfo: [{
    keyType: 3,
    keyCount: 0
  }, {
    keyType: 4,
    keyCount: 0
  }, {
    keyType: 5,
    keyCount: 0
  }],
  commonScreenData: []
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
    },
    setKeyInfo: (state, { payload }) => {
      state.keyInfo = payload
    },
    setCommonScreenData: (state, { payload }) => {
      state.commonScreenData = payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setViewModal,
  setDetailModal,
  setLotteryModal,
  setKeyInfo,
  setCommonScreenData
} = reduxSlice.actions

// 获取钥匙数量
export const getKeys = (query) => async (dispatch) => {
  const res = await Apis.getKeys(query).catch(err => {
    Toast.show({
      content: err.msg
    })
  })
  dispatch(setKeyInfo(res.data.keyCountInfoList??[]))
}

// 获取公屏信息
export const getCommonScreen = () => async (dispatch) => {
  const res = await Apis.getCommonScreen().catch((err) => {
    Toast.show({
      content: err.msg
    })
  })
  const tempArr = []
  res.data?.forEach(item => {
    tempArr.push({
      userName: item.user.nickName,
      giftName: item.gift.giftName,
      dyMoneyAmount: item.gift.dyMoneyAmount
    })
  })
  dispatch(setCommonScreenData(tempArr))
}

// 开盲盒
export const lotteryDraw =
  (query: LotteryType) =>
    async (dispatch) => {
      Toast.show({
        icon: 'loading',
        content: '加载中…'
      })
      const res = await Apis.lotteryDraw(query)
      if (res.data.drawSuccess) {
        Toast.clear()
        dispatch(setLotteryModal({
          visible: true,
          currentBoxType: query.keyInfo?.keyType,
          lotteryDataSource: res.data.lottery??{}
        }))
        dispatch(getKeys({
          userId: query.userId
        }))
        dispatch(getCommonScreen())
      } else {
        Toast.show({
          content: res.data.drawFailedMsg
        })
        setTimeout(() => {
          Toast.clear()
        }, 1000)
      }
    }

// Reducer
export default reduxSlice.reducer
