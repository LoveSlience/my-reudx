import {
  StoreCreator,
  Action,
  Reducer,
  Store,
  Dispatch,
  Listener,
  Unsubscribe,
  Subscribe
} from './index';


const createStore: StoreCreator = <S, A extends Action<any>, Ext, StateExt>(reducer: Reducer<S, A>, preloadState?: S | undefined): Store<S, A> => {

  let currentState: S = preloadState as S;
  let currentListeners: Array<Listener> = [] //存放所有的监听函数

  function getState(): S {
    return currentState
  }

  const dispatch: Dispatch<A> = (action: A): A => {
    currentState = reducer(currentState, action)
    currentListeners.forEach(listener => listener())
    return action; //这一步非常重要
  }
  dispatch({ type: '@@REDUX/INIT' } as A)
  const subscribe: Subscribe = (listener: Listener): Unsubscribe => {
    currentListeners.push(listener)
    return function () {
      let index = currentListeners.indexOf(listener)
      currentListeners.splice(index, 1)
    }
  }

  const store: Store<S, A> = {
    getState,
    dispatch,
    subscribe
  }
  return store
}

export default createStore