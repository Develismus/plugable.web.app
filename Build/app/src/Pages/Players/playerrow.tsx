import React from "react";
import { CardList, Eye, EyeFill } from "react-bootstrap-icons";
import { Button, Card, CardBody, CardGroup, CardSubtitle, CardText, CardTitle, Collapse } from "reactstrap";
import {v4 as uuid } from "uuid";
import {Player}  from "../../store/stores/playerStore";




export function PlayerRow(props:  {player : Player, key : number | string})
{
    const [open, setOpen] = React.useState(false);
    const id = uuid();
    const [collapse , setCollapse] = React.useState(false);

    return (
        <React.Fragment> 
        <tr key={uuid()}>
        <td>
            <Button className="btn btn-default" onClick={()=> { 
                    if(open)
                        setCollapse(false);
                    else
                    {
                        setOpen(true);
                        setTimeout(()=> setCollapse(true),1);
                    } 
                }
            }>{open? <Eye/> : <EyeFill/>}</Button>
        </td>
        <td>{props.player.name}</td>
        <td>{props.player.group}</td>
        <td>{props.player.lastOnlineOnServer}</td>
        <td>{props.player.currentHandle}</td>
    </tr>
    {open? 
    <tr>
        <td style={{minHeight: "0px", margin:"0px", padding:"0px"}} colSpan={5}>
        <Collapse isOpen={collapse} onExited={()=> setOpen(false)}>
            <Card className="m-2" style={{background:"gray"}}>
                <div className="text-center">
                    <h5>{props.player.name}</h5>
                    <h6>{props.player.group}</h6>
                </div>
                <div className="d-flex p-x-5">
                <div className="w-50 p-5">
                    <Card>
                        <CardBody>
                            <CardTitle>Last Login</CardTitle>
                            <CardSubtitle>{props.player.wentOnline}</CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
                <div className="w-50 p-5 context">
                    <span></span> Identifiers
                    {renderIdentifierTable(props.player.identifiers)}</div>
                </div>
            </Card>
        </Collapse>
        </td>
    </tr> : null}
    </React.Fragment>
    );
}




function renderIdentifierTable(Identifiers : {[key:string]:string})
    {
        var entrys = [];

        var i = 0;
        for( var key in Identifiers)
        {
            entrys.push(<tr key={i++}>
                <td>{key}</td>
                <td>{Identifiers[key]}</td>
            </tr>);
        }

        return (
            <div className="dropdown">
            <table className="table table-bordered table-hover table-dark"> 
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {entrys}
                </tbody>
            </table>
            </div>
        );
    }
