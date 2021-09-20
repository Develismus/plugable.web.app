import { Interface } from 'readline';
import { Action } from 'redux';
import * as Counter from './stores/counterStore';
import * as Players from './stores/playerStore';

/**
 * This is the Storage where the state of each components get cached..
 */
export interface AppState {
    counter : Counter.CounterState | undefined;
    players : Players.PlayerState | undefined;
}

/**
     * the reducer Dictionary for custom reducers
     */
 export const reducers = {
    counter : Counter.reducer,
    players : Players.reducer,
};
