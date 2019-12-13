

import { createStore, Action, AnyAction, Reducer, Store, Dispatch } from './redux';

let counterValue: HTMLElement | null = document.getElementById('counter-value') as HTMLParagraphElement
let increment: HTMLElement | null = document.getElementById('increment') as HTMLButtonElement
let decrement: HTMLElement | null = document.getElementById('decrement') as HTMLButtonElement

const INCREMENT = 'INCREMENT'
const DECREMENNT = 'DECREMENNT'

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

function render() {
  counterValue!.innerHTML = store.getState().number + ''

}
render()

store.subscribe(render)

let dispatch: Dispatch<CounterAction> = store.dispatch;

increment.addEventListener('click', (event: MouseEvent) => {
  dispatch({ type: INCREMENT })
})

decrement.addEventListener('click', (event: MouseEvent) => {
  dispatch({ type: DECREMENNT })
})s