import React from "react";
import {Table} from "reactstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { AppState } from "../../store";
import * as PlayerStore from '../../store/stores/playerStore';
import { PlayerRow } from "./playerrow";
import { jsonSchema } from "uuidv4";

type PlayerProps = PlayerStore.PlayerState 
& typeof PlayerStore.actions 
& RouteComponentProps<{ startIndex : string}>;



class Player extends React.PureComponent<PlayerProps>
{
    public componentDidMount(){
        this.ensureDataFetched();
    }



    public componentDidUpdate(){
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Players</h1>
                <p> Nlog demonstration</p>
                {this.renderPagination()}
                {this.renderPlayerTable()}
            </React.Fragment>
        )
    }

    private ensureDataFetched() {
        const startIndex = parseInt(this.props.match.params.startIndex, 10) || 0;
        this.props.requestPlayers(startIndex);
    }





    private renderPlayerTable() {

        return(
            <Table className="table-bordered table-hover table-dark">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Group</th>
                        <th>last online on Server</th>
                        <th>Current Server Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       this.props.players.map((player,index) =>{
                       return(<PlayerRow player={player} key={index}/>);
                    })}
                </tbody>
            </Table>
        );
    }

    private renderPagination()
    {
        const startind = (this.props.startIndex || 0);
        const prevStartIndex = startind > 0? startind -20 : 0;
        const nextStartIndex = (this.props.startIndex || 0) +20;

        return (
            <div className="d-flex ">
                <Link className='btn btn-outline-secondary btn-sm' to={`/player/${prevStartIndex}`}>prev</Link>
                <Link className="btn btn-outline-secondary btn-sm" to={`/player/${nextStartIndex}`}>next</Link>
            </div>
        );
    }




}

export default connect(
    (state: AppState) => state.players,
    PlayerStore.actions
)(Player as any);
