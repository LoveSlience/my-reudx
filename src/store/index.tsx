
import { createStore, Action, Reducer, Store } from '../redux';

export const INCREMENT = 'INCREMENT'
export const DECREMENNT = 'DECREMENNT'


interface State {
  number: number
}

let initState: State = { number: 0 };
type CounterAction = Action<string>

const reducer: Reducer<State, CounterAction> = (state: State = initState, action: CounterAction): State => {
  switch (action.type) {
    case INCREMENT:
      return { number: state.number + 1 }
    case DECREMENNT:
      return { number: state.number - 1 }
    default:
      return state
  }
}

let store: Store<State, CounterAction> = createStore<State, CounterAction, {}, {}>(reducer)

export default store
