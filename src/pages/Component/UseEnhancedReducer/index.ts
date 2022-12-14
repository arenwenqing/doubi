/**
 * 自定义增强型 useReducer
 * 在 react useReducer 基础上，增加 redux-thunk 和 redux-promise 功能
 * 即：
 * 1. 支持 function 类型的 action
 * 2. 支持 Promise 类型的 action.payload
 * 3. 支持 getState 方法，获取实时 state
 * 参考：
 * https://medium.com/@joseph.michael.sample/async-actions-with-usereducer-d75a2c5dc55c
 * https://medium.com/solute-labs/configuring-thunk-action-creators-and-redux-dev-tools-with-reacts-usereducer-hook-5a1608476812
 */
import { useReducer, useRef, useCallback } from 'react';

const useEnhancedReducer = (reducer, initialState) => {
  // 使用 useRef , 实现 getState 获取最新 state
  const lastState = useRef(initialState);
  // 将 handleActions 处理好的 reducer 包裹一层，将每次 reducer 计算出的最新 state 赋值给 ref 对象
  const reducerWapper = useCallback(
    (state, action) => {
      const result = reducer(state, action);
      lastState.current = result;
      return result;
    },
    [reducer]
  );

  const [state, dispatch] = useReducer(reducerWapper, initialState);
  const getState = useCallback(() => lastState.current, []);

  const enhancedDispatch = useCallback(
    (action) => {
      // 支持 function 类型的 action
      if (typeof action === 'function') {
        return action(enhancedDispatch, getState);
      } else {
        // 让 dispatch 支持 promise 类型的 action
        if (action.payload instanceof Promise) {
          return action.payload.then((result) => {
            return dispatch({ type: action.type, payload: result });
          });
        } else {
          return dispatch(action);
        }
      }
    },
    [getState]
  );

  return [state, enhancedDispatch, getState];
};

export default useEnhancedReducer;