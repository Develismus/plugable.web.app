import { Action } from "redux";
import { AppState } from ".";


type Dict = {[key : string] : any}; 

export type NType<TObject> = {[P in keyof TObject]? : TObject[P]};



export interface AppThunkAction<TAction>{
    (dispatch :(action : TAction) => void, getState: () => AppState): void;
}

type DispatchAction<TState> = {
    type : string;
    action : (state : TState) => TState;
}

/**
 * Generic Thunk to create actions with 'dispatch' and 'getState'
 * @example 
 * 
 * const actions = {
 *      myAction ():Thunk<MyState> => (dispatch, getState) => {
 *          const currentState = getState().myStore;
 *          
 *          if(currentstate.myValue === 1)
 *                dispatch(createAction<MyState>((state)=>{
 *                     state.myValue = 0;
 *                      return state;  
 *                })));
 *      }
 * }
 */
export type Thunk<TState> = AppThunkAction<DispatchAction<TState>>

/**
 * 
 * @param storeName The name of the current Store or the key to the store
 * @param action the logic behind the Action to manipulate the State
 * @returns a Thunk that can be directly used on the action.
 * 
 * @example
 * 
 * const actions = {
 *      increment : createDispatch<MyState>("<MY_STORE>", (state) =>{
 *          state.value++;
 *          return state;
 *      }),
 *      decrement : createDispatch<MyState>("<MY_STORE>", (state) => {
 *          state.value--;
 *          return state;
 *      })
 * }
 */
export const createDispatch = <TState>(storeName : string, action: (state : TState) => TState) : Thunk<TState> => (dispatch) =>{
    dispatch({type : storeName, action : action});
};

/**
 * Creates an Action for Dispatch, this is usefull when working with async Actions to be able to trigger 'dispatch' manually
 * @param typeName this is to determine you talking with the right reducer make sure each store has a unique type
 * @param act here you can define a function that will be called in the reducer to manipulate the State of the component.
 * @returns {DispatchAction} a finished action wich can be taken from 'dispatch'
 * @example  
 
//predifined typing for faster usage
const createAction = (action : (state : MyState) => MyState) =>{
    return Store.createAction("MYSTATE_ACTION", action);
}

//The actions used in the component later on
const actionCreator = {
        incrementAsync : (): Store.Thunk<MyState> => async (dispatch) =>
        {
            await delay(500);
            dispatch(createDispatch((state) => {
            state.myProperty = "newValue";
            return state;
    }))
    },
    };
*/
export const createAction = <TState>(typeName : string, act: (state : TState) => TState): DispatchAction<TState> => {
    return {type : typeName, action : act};
}

export function StateFunctionBuilder <TState>(storeName : string) {
    return (newState: NType<TState>) => createAction<TState>(storeName, (state) => {
        var s = state as Dict;
        for(var key in newState)
            s[key] = newState[key] ?? s[key]; 
        return state as TState;
    });
} 

export const StateDispatchBuilder = <TState>(storeName : string) => (newState : NType<TState>) => createDispatch<TState>(storeName, (state) => {
    var s = state as Dict;
    for(var key in newState)
        s[key] = newState[key] ?? s[key]; 
    return state;
});


/**
 * Method to create a dispatch method to create action later on
 * @param storeName the name of the Store
 * @returns a function to easily create Dispatches
 * @example
 * 
 * //The builder to create Actions from
 * const createDispatch = DispatchBuilder<MyState>("<STORE_NAME>");
 * 
 * //The actions used in the component later on
 * const actions = {
 *    setSomeValue0 : createDispatch((state) => {
 *      state.myValue = "someValue";
 *      return state;
 *    }),
 *    IncreaseValue : createDispatch((state) => {
 *      state.myNumber += 1;
 *      return state;
 *    })
 * };
 */
export const DispatchBuilder = <TState>(storeName : string) => (act: (state : TState) => TState) : Thunk<TState> => (dispatch) =>{
    dispatch({type : storeName, action : act});
};


/**
 * Method to create a dispatch method to create action later on
 * @param storeName the name of the Store
 * @returns a function to easily create Actions for use in async context
 * @example
 * 
 * 
 * 
 *  interface MyState {
 *  myProperty : string;
 *  myData : MyData;
 *  index : number;
 * }
 * 
 * 
 * 
 *  //predifined typing for faster usage
    const createAction = ActionBuilder<MyState>("<STORE_NAME>")

    //The actions used in the component later on
    const actions = {
        setValueAsync : (): Store.ThunkAction<MyState> => async (dispatch) =>{
            await delay(500);
            dispatch(
                createAction((state) => {
                    state.myProperty = "newValue";
                    return state;
                })
            );
        },
        fetchMyData : (index: number): ThunkAction<MyState> => async (dispatch, getState) =>{
            const appState = getState();
            if(appState && appState.myState && index !== appState.myState.index)
            {
                var myData = (await fetch(`api/myData?index=${index}`).then(resp => resp.json())) as MyData; 
                dispatch(
                    createAction((state) => {
                        state.myData = myData;
                        return state;
                    })
                );
            }
        }
    };
    */
export const ActionBuilder = <TState>(storeName: string) => (act : (state : TState) => TState): DispatchAction<TState> => {
    return {type : storeName, action : act};
}

/**
 * Function to generate a predefined Reducer function which will manage the incomming actions later on for your store
 * @param Name The Name of the Store
 * @param initialState the initial state of the Reducer
 * @returns the actual reducer function so you dont ned to write your own..
 * @example
 * 
 * const initState : MyState = {
 *      myValue : 0,
 *      mySecondValue : 2
 * }
 * const reducer = configureReducer("<MY_STORE>", initState);
 */
export const configureReducer = <TState>(Name: string,initialState : TState ) => (state : TState | undefined, incommingAction : Action) : TState => {
    if(state === undefined)
        return initialState;
    const action = incommingAction as DispatchAction<TState>;
    var newstate = {...state};
    if(action.type === Name)
        return action.action(newstate);
    return state;
}