import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { History } from 'history';
import  {AppState, reducers} from './Linker';
import { connectRouter, routerMiddleware  } from 'connected-react-router';
import thunk from 'redux-thunk';




export default function configureStore(history : History, preloadedState? :AppState)
{
  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  const enhancers = [];

  const windowIfDefined = typeof window === 'undefined' ? null : window as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }


  return createStore(
      rootReducer,
      preloadedState, 
      compose(applyMiddleware(...middleware), ...enhancers)
  );
}
