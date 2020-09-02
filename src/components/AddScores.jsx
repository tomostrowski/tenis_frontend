import React, { Component } from 'react';

class AddScores extends Component {
    state = { 
        set1player1:0,
        set1player2:0,
        set2player1:0,
        set2player2:0,
        set3player1:0,
        set3player2:0,
        players: this.props.players,
        gameId: this.props.gameId,
        winnerId:0,
        groupId: this.props.groupId,
        showSet3: false
     }

    render() { 
        const {players} = this.state
        const game = this.game
        // alert("players: "+players.length)
        return ( 
            <form onSubmit={this.handleSubmit} id="addScoresForm" >
            <table>
                <tr style={{display: 'block'}}>
                    <td>Set 1:</td>
                    <td ><input id="set1player1" type="number" placeholder="0" className="input-edit col-md-4" onChange={this.handleChange} /></td>
                    <td>:</td>
                    <td ><input id="set1player2" type="number" placeholder="0" className="input-edit col-md-4" onChange={this.handleChange} /></td>
            </tr>
            <tr style={{display: 'block'}}>
                    <td>Set 2:</td>
                    <td ><input id="set2player1" type="number" placeholder="0" className="input-edit col-md-4" onChange={this.handleChange} /></td>
                    <td>:</td>
                    <td ><input id="set2player2" type="number" placeholder="0" className="input-edit col-md-4" onChange={this.handleChange} /></td>
                    <td colSpan="4" ><span className={!this.state.showSet3? "fas fa-plus float-right":"fas fa-minus float-right"} onClick={()=>this.addSet()}></span></td>
            </tr>
            <tr style={{display: this.state.showSet3 ? 'block' : 'none' }}>
                    <td>Set 3:</td>
                    <td ><input id="set3player1" type="number" placeholder="0" className="input-edit col-md-4" onChange={this.handleChange} /></td>
                    <td>:</td>
                    <td ><input id="set3player2" type="number" placeholder="0" className="input-edit col-md-4" onChange={this.handleChange} /></td>
            </tr>
            <tr><td><hr/></td></tr>
            <tr>
                <td>
                <label>Wygrał</label>
                    <select id="winnerId" name="winner" onChange={this.handleChange} >
                        <option value="0" hidden></option>
                     {!players.length?
                     <><option selected hidden disabled>Brak zawodników</option></>:
                     players.map(player=> 
                        <option value={player.id} >{player.name}</option>
                        )}
                    </select>
                </td>
                <td>
                <button className="btn btn-success btn-lg m-2" type="submit">
                    Zapisz
                  </button>
                </td>
            </tr>
            </table>
            </form>
         );
    }

    handleChange =(event) =>{
        event.preventDefault();
        let id = event.target.id;
        let val = event.target.value;
        
        if (val<0 ) {event.target.value =0}
        this.setState({
          [id]: val
        })
        
      }
      

      handleSubmit = (event) => {
        event.preventDefault();
        let url = `${process.env.REACT_APP_API}/game/`+this.state.gameId;
        // const urlWinner = "http://localhost:8989/api/game/"+this.state.gameId+"/winner="+this.state.winnerId
        if (this.state.set3player1===0 && this.state.set3player2===0) {url= url+"/scores="+this.state.set1player1+"-"+this.state.set1player2+"-"+this.state.set2player1+"-"+this.state.set2player2+"/winner="+this.state.winnerId+"/group="+this.state.groupId}
        else {url=url+"/scores3="+this.state.set1player1+"-"+this.state.set1player2+"-"+this.state.set2player1+"-"+this.state.set2player2+"-"+this.state.set3player1+"-"+this.state.set3player2+"/winner="+this.state.winnerId+"/group="+this.state.groupId}
        this.postUpdate(url);
      }

      async postUpdate(url){
        // alert(url)
         fetch(url,{
              method: 'POST',
              // mode: "CORS",
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
      }

    //   async patchUpdate(url){
    //     // alert(url)
    //      fetch(url,{
    //           method: 'PATCH',
    //           // mode: "CORS",
    //           header: {'Accept': 'application/json',
    //           'Content-Type':'applicaton/json'
    //           }
    //         })
    //         window.location.reload();
    //   }

      addSet=e=>{
        this.setState({showSet3: !this.state.showSet3})
      }

}
 
export default AddScores;