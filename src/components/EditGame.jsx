import React, { Component } from 'react';

class EditGame extends Component {
    state = { 
              id: 0,
              date:"2020-01-01",
              time:"00:00",
              firstPlayerId:1,
              firstPlayer:"Zawodnik domyślny",
              secondPlayerId:1,
              secondPlayer:"Zawodnik domyślny",
              gameId: this.props.gameId

            }

    async componentDidMount() {
        const urlToApi= `${process.env.REACT_APP_API}/game`+this.props.gameId;
        alert("gameId:  "+this.props.gameId)
        const game = await(await(fetch(urlToApi))).json();
        this.setState({
                        id:game.id,
                        date:game.date,
                        time:game.time,
                        firstPlayerId: game.firstPlayerId,
                        firstPlayer: game.firstPlayer,
                        secondPlayerId: game.secondPlayerId,
                        secondPlayer: game.secondPlayer,
                      });
      }


    render() { 
      const game = this.state;
        return ( 
            <React.Fragment>
            <div className="page-height">
              <h3>Edycja meczu</h3>
              <div className="center">
                <form className="background-layer" onSubmit={this.handleSubmit} id="addPlayerForm" action="/home">
                  <div id="messagePlayerAdded" className="messageOK ">Dodano nowego zawodnika</div>
                  <div className="form-group">
                    <label>Zawodnik #1</label>
                    <select id="playerToChoose1" name="player1" onChange={this.handleChange}>
                     {/* {!players.length? */}
                     {/* <><option selected selected hidden disabled>Brak zawodników</option></>: */}
                     {/* players.map(player=>  */}
                        <option value={game.firstPlayerId}>{game.firstPlayer} </option>
                        {/* )}  */}
                    </select>
                    <label>Zawodnik #2</label>
                    <select id="playerToChoose2" name="player2" onChange={this.handleChange}>
                    {/* {!players.length? */}
                     {/* <><option selected hidden disabled>Brak zawodników</option></>: */}
                     {/* players.map(player=> */}
                      <option value={game.secondPlayerId}>{game.secondPlayer} </option>
                     {/* )} */}
                    </select>
                    <label htmlFor="exampleInputEmail1">Data</label>
                    <input
                      id="gameDate"
                      type="text"
                      name="date"
                      className="form-control"
                      placeholder={game.date}
                      onFocus={this.handleDate}
                      aria-describedby="dataHelp"
                      onChange={this.handleChange}
                      required
                    />
                         <label htmlFor="exampleInputEmail121">Godzina</label>
                    <input
                      id="gameTime"
                      type="text"
                      name="time"
                      placeholder={game.time}
                      onFocus={this.handleTime}
                      className="form-control"
                      aria-describedby="timeHelp2"
                      onChange={this.handleChange}
                    />
                      <label>Wygrany</label>
                        <select id="winnerToChoose" name="winner" onChange={this.handleChange}>
                          <option value={game.firstPlayerId}>{game.firstPlayer} </option>
                          <option value={game.secondPlayerId}>{game.secondPlayer} </option>
                        </select>
                    <br />
                  {/* <button className="btn btn-success btn-lg m-2" type="submit" >
                    Dodaj
                  </button> */}
                  </div>
                </form>
              </div>
            </div>
          </React.Fragment>
         );
    }

    handleDate=(event)=>{
      let typeToChange = event.target.type;
      typeToChange= "date"
      document.getElementById("gameDate").type=typeToChange

      // alert(typeToChange)
    }

    handleTime=(event)=>{
      let typeToChange = event.target.type;
      typeToChange= "time"
      document.getElementById("gameTime").type=typeToChange

      // alert(typeToChange)
    }

    handleChange=(event)=>{
      const name = event.target.name;
      const value = event.target.value;
      let url = "http://localhost:8989/api/game/"

      if(!name.includes("player"))
      { url = url+this.state.gameId+"/"+name+"="+value}
      else {url = url+this.state.gameId+"/"}
      alert(url)
      this.patchUpdate(url)
    }
    
      async patchUpdate(url){
        // alert(url)
         fetch(url,{
              method: 'PATCH',
              // mode: "CORS",
              header: {'Accept': 'application/json',
              'Content-Type':'applicaton/json'
              }
            })
            window.location.reload();
      }

}
 
export default EditGame;