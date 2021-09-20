import * as Store from '..'
import { NType } from '../storeHelper';

const playerStore = "PLAYER_STORE";

export interface PlayerState{
    isLoading : boolean;
    startIndex? : number;
    players : Player[];
}

const initState: PlayerState = {
    isLoading : false,
    startIndex : -1,
    players : []   
}

export interface Player {
    id : string;
    name : string;
    group: string;
    identifiers : {[key : string]: string};
    wentOnline : Date;
    wentOffline : Date;
    lastOnlineOnServer : string;
    currentHandle : number;
}

const createAction = Store.ActionBuilder<PlayerState>(playerStore);
const createDispatch = Store.ActionBuilder<PlayerState>(playerStore);

const setState = Store.StateFunctionBuilder<PlayerState>(playerStore);

export const actions = {
    requestPlayers : (startindex : number) : Store.Thunk<PlayerState> => async (dispatch,getState) =>{
        
        startindex = startindex >= 0? startindex : 0;
        const appState = getState();
        if(appState && appState.players && startindex !== appState.players.startIndex)
        {
            dispatch(
                setState({isLoading : true})
            );
            var players = (await fetch(`api/player/*?skip=${startindex}`).then(resp => resp.json())) as Player[]    
            dispatch(
                setState({startIndex : startindex, players : players, isLoading : false})
            );
        }    
    },
    getByIdentifiers : (identifiers : {[key : string] : string}) : Store.Thunk<PlayerState> => async (dispatch, getState) =>{
        
        dispatch(
            setState({isLoading : false})
        );
        var players = (await fetch(`api/player/ByIdentifiers/${JSON.stringify(identifiers)}`).then(resp => resp.json())) as Player[];
        dispatch(
            setState({startIndex : 0, players : players, isLoading : false})
        );
    }
}
export const reducer = Store.configureReducer(playerStore, initState);