import React from 'react';
import { Unsubscribe, bindActionCreators, ActionCreator, AnyAction } from 'redux';
import store, { INCREMENT, DECREMENNT } from '../store'


interface Props {

}

interface State {
  number: number
}

/**
 * 1、组件能从仓库取值
 * 当仓库中的状态发生改变的时候
 * 2、组件可以香仓库派发动作
*/

/**
 * bindActionCreators
 * 绑定action创建者
 * ActionCreators 就是action的创建者
 */
// let increment = () => {
//   return { type: INCREMENT }
// }

let decrement = () => {
  return { type: DECREMENNT }
}
let increment = () => {
  return { type: INCREMENT }
}

let increment1 = bindActionCreators<any, any>(increment, store.dispatch);
decrement = bindActionCreators<any, any>(decrement, store.dispatch);

export default class extends React.Component<Props, State> {
  unsubscribe: Unsubscribe
  constructor(props: Props) {
    super(props)
    this.state = {
      number: store.getState().number
    }
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState({
      number: store.getState().number
    }))
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={() => store.dispatch(increatment())}>+</button>
        <button onClick={() => store.dispatch(decreament())} > -</button>
      </div>
    )
  }
}