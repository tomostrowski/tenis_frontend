import React, { Component } from 'react';

class AddGame extends Component {
    state = { 
      players:[],
      playerId: this.props.playerId,
      playersWithoutChoosen:[],
      playerToChoose1:0
     }

    async componentDidMount() {
      const urlToApi= `${process.env.REACT_APP_API}/group/`+this.props.groupId+"/getPlayers"
      const players = await(await(fetch(urlToApi))).json();
      this.setState({players:players});
    }
 
    render() { 
      const {players} = this.state;
      const {playersWithoutChoosen} = this.state;
        return ( 
            <React.Fragment>
            <div className="page-height">
              <h3>Dodaj mecz</h3>
              <div className="center">
                <form className="background-layer" onSubmit={this.handleSubmit} id="addPlayerForm" action="/home">
                  <div id="messagePlayerAdded" className="messageOK ">Dodano nowego zawodnika</div>
                  <div className="form-group">
                    <label>Zawodnik #1</label>
                    <select id="playerToChoose1" name="player1">
                     {!players.length?
                     <><option selected hidden disabled>Brak zawodników</option></>:
                     players.filter(player=>
                      this.state.playerId==0?player.id!=this.state.playerId:player.id==this.state.playerId)
                      .map(player=> 
                        <option value={player.id} selected>{player.name} {player.surname}</option>
                        )} 
                    </select>
                    <label>Zawodnik #2</label>
                    <select id="playerToChoose2" name="player2" onChange={this.handleChange}>
                    {(players.length<2)?
                     <><option selected hidden disabled>Za mało zawodników</option></>:
                    //  players.filter(player=>(this.state.playerToChoose1!==player.id)).map(player=> 
                      players.filter(player=>player.id!=this.state.playerId).map(player=> 
                        <option value={player.id} selected>{player.name} {player.surname} </option>
                        )} 
                    {/* {alert("playerToChoose1:  "+this.state.playerToChoose+" liczba zawodnikoów: "+this.state.players.length)} */}
                    </select>

                    {/* <PlayerInGroupCombo groupId={this.props.groupId} playerToChoose1={this.state.playerToChoose1}/> */}

                    <label htmlFor="date">Data</label>
                    <input
                      type="date"
                      name="matchData2"
                      className="form-control"
                      id="gameDate"
                      aria-describedby="dataHelp"
                      onChange={this.handleChange}
                      required
                    />
                         <label htmlFor="exampleInputEmail121">Godzina</label>
                    <input
                      type="time"
                      name="sendEmail"
                      className="form-control"
                      id="gameTime"
                      aria-describedby="dataHelp2"
                      onChange={this.handleChange}
                    /><br />
                  <button className="btn btn-success btn-lg m-2" type="submit">
                    Dodaj
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </React.Fragment>

         );
         
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const player1 = document.getElementById("playerToChoose1").value;
        const player2 = document.getElementById("playerToChoose2").value;
        const date = document.getElementById("gameDate").value;
        const time = document.getElementById("gameTime").value;
        const url = `${process.env.REACT_APP_API}/player/${player1}/game/player=${player2}/group=${this.props.groupId}/date=${date}/time=${time}`;
        this.postToUrl(url);
    }

      handleChange = (event) =>{
        const player1Id = document.getElementById("playerToChoose1").value;
        
        const playersWithoutChoosen= this.state.players.filter(player=>player1Id!=player.id)
        this.setState({playersWithoutChoosen: playersWithoutChoosen})
        this.setState({playerToChoose: player1Id})
      }

    async postToUrl(url){
      alert(url)
       await fetch(url,
        {
            method: 'POST',
            // mode: "CORS",
            header: {'Accept': 'application/json',
            'Content-Type':'applicaton/json'
            },
          },
          )
          .then(function(response){

            if (response.ok) {
              return response.text().then(function(message ){alert(message )})
          } else {
              return response.text().then(function(message ){alert(message)})
          }
          })
           
          window.location.reload();
    }

}
 

export default AddGame;