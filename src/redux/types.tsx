// import { Reducer } from 'react';


export interface Action<T = string> {
  type: T
};

export interface AnyAction extends Action {
  [extraProps: string]: any
};

//reducer 是一个处理函数， 接受老得状态和动作返回新的状态
// export interface Reducer1<S = any, A extends Action = AnyAction> {
//   (state: S | undefined, action: A): S
// }
export type Reducer<S = any, A extends Action = AnyAction> = (state: S | undefined, action: A) => S;

//dispatch 返回值就是派发动作的action
export type Dispatch<A extends Action = AnyAction> = (action: A) => A;

export type Subscribe = (listener: Listener) => Unsubscribe

export type Listener = () => void;

export type Unsubscribe = () => void;

export interface Store<S = any, A extends Action = AnyAction> {
  dispatch: Dispatch<A>, //派发动作， 改变仓库中的状态
  getState(): S,
  //订阅的时候传入一个函数， 返回一个取消订阅的函数
  subscribe(listener: Listener): Unsubscribe //订阅仓库中放入状态变化
};

/**
 * S State代表本仓库管理的状态的类型
 * A Action 代表向本仓库派发的动作的类型
 */

// export interface StoreCreator {
//   <S, A extends Action<any> = AnyAction, Ext = any, StateExt = any>(
//     reducer: Reducer<S, A>,
//     preloadedState?: S
//   ): Store<S, A>
// }

export type StoreCreator = <S, A extends Action<any> = AnyAction, Ext = any, StateExt = any>(
  reducer: Reducer<S, A>,
  preloadedState?: S
) => Store<S, A>
