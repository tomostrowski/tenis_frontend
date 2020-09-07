import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const URL = `${process.env.REACT_APP_API}/player/`;

class FindPlayer extends Component {
    state = {
            players: [],
            findName: " ",
            findSurname: "",
            url: "/player",
            isLoading: false
        }

    componentDidMount(){
        this.findPlayers()
    }

    render() { 
        const  { players } = this.state;
        return (
            <React.Fragment>
                <table className="table table-hover" >
                    <thead> 
                        <tr> 
                        {/* <th scope="col">#</th>
                        <th scope="col">Imię</th>
                        <th scope="col">Nazwisko</th>
                        <th scope="col"></th> */}
                        </tr>
                  </thead> 
                    <tbody>
                        <tr>
                            <td><input id="name" name="name" onChange={()=>this.findPlayers()}/></td>
                            <td><input id="surname" name="surname" onChange={()=>this.findPlayers()}/></td>
                        </tr>
                    </tbody>
                </table>
                <h5>Znaleziono: {players.length}</h5>
                <table className="table table-hover table-scrollable">
                    <tbody>      
                   {players.map(player =>

                        <tr>
                            <td><Link to={`${this.state.url}/${player.id}`}>{player.name}</Link></td>
                            <td><Link to={`${this.state.url}/${player.id}`}>{player.surname}</Link></td>
                            <td colSpan="4" ><button onClick={()=>this.addToGroup(player.id, this.props.groupId)} className="btn btn-success btn-sm"> Dodaj</button></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

    async findPlayers() {
          const name = document.getElementById("name").value.trim();
          const surname = document.getElementById("surname").value.trim();

        const players = await (await fetch(`${process.env.REACT_APP_API}/player/find?name=`+name+"&surname="+surname)).json();
        this.setState({ players, isLoading: false });
      }


    async addToGroup(playerId, groupId){
        try{
            let url = URL+`${playerId}/addGroup=${groupId}`;
        //    isNaN(groupId)? url = url + "addGroupName="+groupId : url = url + "addGroup="+groupId;
           alert(url);
           fetch(url,{
             method: 'PATCH',
            //  mode: "CORS",
             header: {'Accept': 'application/json',
             'Content-Type':'applicaton/json'
             }
           })
           .then(function(response){
            if (response.ok) {
              return response.text().then(function(message ){alert(message )})
          } else {
              return response.text().then(function(message ){alert(message)})
          }
          })
          window.location.reload();
       
           } catch(error){
             console.log(error);
           }
    }


}

export default FindPlayer;
