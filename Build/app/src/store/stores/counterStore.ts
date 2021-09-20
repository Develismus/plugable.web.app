import * as Store from '..';
import { delay } from '../../Utils';

export interface CounterState {
  value: number;
  incrementValue : number;
}

const initialState: CounterState = {
  value: 0,
  incrementValue : 2,
};

const actionType = 'COUNTER_ACTION';
//Predefined creators for fast action implementation
const createAction = Store.ActionBuilder<CounterState>(actionType);
const createDispatch = Store.DispatchBuilder<CounterState>(actionType);
const setState = Store.StateFunctionBuilder<CounterState>(actionType);
const dispatchState = Store.StateDispatchBuilder<CounterState>(actionType);

export const actions = {
  increment : () => createDispatch((state) =>  ({value : state.value +1,incrementValue :state.incrementValue})),
  decrement : ()=> createDispatch((state) => {
      state.value--;
      return state;
  }),
  incrementByAmount : (ammount : number) => createDispatch( (state) => {
      state.value += ammount;
      return state;
  }),
  incrementAsync : (): Store.Thunk<CounterState> => async (dispatch) =>{
      await delay(500);
      dispatch(createAction((state) => {
        state.value++;
        return state;
      }))
  },
  incrementIfOdd : (ammount : number) => createDispatch((state) => {
      if(state.value % 2 === 1)
        state.value += ammount;
      return state;
  }),
  setIncrementAmmount : (ammount : number) => dispatchState({incrementValue : ammount}),
}
export const reducer = Store.configureReducer(actionType, initialState);