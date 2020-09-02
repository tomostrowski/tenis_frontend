import React, { Component } from 'react';

class PlayerInGroupCombo extends Component {
    state = { 
        players:[],
        playerToChoose:this.props.playerToChoose
  
       }
  
      async componentDidMount() {
        // const groups = await (await fetch("http://tenis-projekt.herokuapp.com/api/group/all")).json(); // ZMIENIC!!!!!!!!!!!!!!!!!!!!!!!
        // const group = await (await fetch("http://localhost:8989/api/group/"+ this.props.match.params.groupId)).json();
        // this.setState({ id:group.id,name:group.name, players:group.players,isLoading: false });
    
        // const playerStats = await (await fetch("http://localhost:8989/api/group/"+ this.props.match.params.groupId+"/getPlayers")).json();
        const urlToApi= `${process.env.REACT_APP_API}/group/`+this.props.groupId+"/getPlayers"
        // alert(this.props.groupId)
        const players = await(await(fetch(urlToApi))).json();
        this.setState({players});
      }

    render() { 
        const {players} = this.state;

        return ( 
            <React.Fragment>
            <label>Zawodnik #2</label>
            <select id="playerToChoose" name="player2" onChange={this.handleChange}>
            {!players.length?
             <><option selected selected hidden disabled>Brak zawodników</option></>:
             players.filter(player=>(this.state.playerToChoose!==player.id)).map(player=> 
                <option value={player.id}>{player.name} {player.surname} </option>
                )} 
            {/* {alert("playerToChoose1:  "+this.state.playerToChoose1)} */}
            </select>


            </React.Fragment>
         );
    }
}
 
export default PlayerInGroupCombo;