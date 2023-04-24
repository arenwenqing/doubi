import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { Toast } from 'antd-mobile'
import Apis from 'src/apis'

let flag = true
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
    type: 3,
    num: 0
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
  commonScreenData: [],
  exchangeCodeModal: {
    visible: false
  },
  shareModal: {
    visible: false
  },
  showCurrentBroadCast: {
    img: '',
    value: ''
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
    },
    setKeyInfo: (state, { payload }) => {
      state.keyInfo = payload
    },
    setCommonScreenData: (state, { payload }) => {
      state.commonScreenData = payload
    },
    setExchangeCodeModal: (state, { payload }) => {
      state.exchangeCodeModal = payload
    },
    setShareModal: (state, { payload }) => {
      state.shareModal = payload
    },
    setShowCurrentBroadCast: (state, { payload }) => {
      state.showCurrentBroadCast = payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setViewModal,
  setDetailModal,
  setLotteryModal,
  setKeyInfo,
  setCommonScreenData,
  setExchangeCodeModal,
  setShareModal,
  setShowCurrentBroadCast
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
  let tempArr = []
  res.data?.forEach(item => {
    tempArr.push({
      userName: item.user.nickName,
      giftName: item.gift.giftName,
      dyMoneyAmount: item.gift.dyMoneyAmount
    })
  })
  tempArr = tempArr.concat(tempArr)
  dispatch(setCommonScreenData(tempArr))
}

// 开盒子
let timerId
let timerId2
export const lotteryDraw =
  (query: LotteryType) =>
    async (dispatch) => {
      if (!flag) return
      flag = false
      dispatch(setLotteryModal({
        visible: true,
        currentBoxType: query.keyInfo?.keyType,
        lotteryDataSource: {}
      }))
      if (timerId) {
        clearTimeout(timerId)
      }
      Toast.show({
        icon: 'loading',
        content: '加载中…',
        duration: 1300
      })
      timerId = setTimeout( async () => {
        const res = await Apis.lotteryDraw(query).catch(err => {
          if (err.response.status === 500) {
            flag = true
          }
        })
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
            content: res.data.drawFailedMsg,
            duration: 2000
          })
        }
        if (timerId2) {
          clearTimeout(timerId2)
        }
        timerId2 = setTimeout(() => {
          flag = true
        }, 1000);
      }, 3000);
    }

// Reducer
export default reduxSlice.reducer
