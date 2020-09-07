import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AddGame from './AddGame';
import Modal from './Modal';
import EditGame from './EditGame';
import AddScores from './AddScores';

class Game extends Component {
    state = { 
        games:[],
        groupId: this.props.groupId,
        isLoading: false,
        showModal: false,
        editGame: false,
        addScores: false,
        playerId: this.props.playerId,
        gameId:0,
        firstPlayer: "Imię i nazwisko",
        secondPlayer: "Imię i nazwisko",
        groupId: this.props.groupId,
        players:[{
            id: 1,
            name: "Zawodnik 1", 
           },
            {
            id: 2,
            name: "Zawodnik 2",
            }
        ]
     }

     async componentDidMount() {
        let urlToApiGames;
    if (this.props.playerId ==="0") {urlToApiGames= `${process.env.REACT_APP_API}/group/`+this.state.groupId+"/allGames"; }
    else {urlToApiGames= `${process.env.REACT_APP_API}/player/`+ this.props.playerId+"/group="+this.state.groupId+"/allGames";}
      
      const games = await (await fetch(urlToApiGames)).json();
          this.setState({games});
    }

    render() { 
        const {games} = this.state;
        const winnerClass = "badge m-2 badge-success";
        let rating = 1;

        return ( 
        <React.Fragment>
        <h2>Rozegrane mecze: <b>{games.length}</b></h2>
        <Link to={"/group/"+this.props.groupId}><h5>Grupa {this.props.groupName}</h5></Link>
            {this.state.isLoading ? <div className="loader"></div> : 

            <div>
            <table className="table table-hover">
            <thead>
                <tr> 
                <th scope="col">#</th>
                <th scope="col">Data</th>
                <th scope="col">Zawodnik #1</th>
                <th scope="col">Zawodnik #2</th>
                <th scope="col">Wynik </th>
            </tr>
            </thead>
            <tbody>
                {!games.length?<tr><td>Brak rozegranych meczy</td></tr>:
                 <>{games.map(game=>
                    <>
                    <tr>
                    <th scope="row">{rating++}</th>
                        <td>{game.date}</td>
                        <td> 
                        {game.scores.length && game.firstPlayerId==game.winnerId?<span>{game.firstPlayer}<span className={winnerClass}>winner</span></span>:<span>{game.firstPlayer}</span>} 
                        </td>
                        <td> 
                        {game.scores.length && game.secondPlayerId==game.winnerId?<span>{game.secondPlayer}<span className={winnerClass}>winner</span></span>:<span>{game.secondPlayer}</span>} 
                        </td>    
                        <td>
                        {game.scores.length? game.scores.map(score=>
                        <div className="badge badge-light">
                            <span className="badge m-2 badge-warning"><span>{score.player1Set}</span> : <span>{score.player2Set}</span></span><br />
                        </div>):
                        <button className="btn btn-success btn-sm m-2" onClick={e => {
                            this.showAddScoresModal(game.id, game.firstPlayerId, game.firstPlayer, game.secondPlayerId, game.secondPlayer);
                        }}> Podaj wynik </button>
                        }
                        </td>
                        <td><span id={game.id} className="fas fa-pencil-alt float-right" onClick={()=> this.editGame(game.id)}></span></td> 
                </tr> </>)}</>}
                </tbody>
            </table>
            
           </div>
           }
               <button className="btn btn-success btn-sm m-2" onClick={e => {
                    this.showModal();
                }}> Dodaj mecz </button>
                
           
           <Modal showModalCallback={this.showModalCallback}  showModal={this.state.showModal} >
               <AddGame playerId ={this.state.playerId} groupId={this.props.groupId}/>
               {/* <button className="btn btn-secondary close-button" onClick={this.showModalCallback}>Anuluj</button> */}
            </Modal>
            <Modal showModal={this.state.editGame} showModalCallback={this.toggleModal}>
                <EditGame gameId={this.state.gameId}/>
            {/* <button className="btn btn-secondary close-button" onClick={this.toggleModal}>Anuluj</button> */}
            </Modal>
            <Modal showModal={this.state.addScores} showModalCallback={this.toggleAddScoresModal}>
                <AddScores groupId={this.state.groupId} gameId={this.state.gameId} players={this.state.players} />
            {/* <button className="btn btn-secondary close-button" onClick={this.toggleModal}>Anuluj</button> */}
            </Modal>
            </React.Fragment>
        );
    }

    showModal = e => {
        this.setState({
          showModal: !this.state.showModal
        });
      };

      showModalCallback = e =>{
          this.setState({
              showModal: !this.state.showModal,
              
          })
      }

      showAddScoresModal(gameId, firstPlayerId, firstPlayer, secondPlayerId, secondPlayer){
        this.setState({
            addScores: !this.state.addScores,
            gameId: gameId,
            players:[{
                id: firstPlayerId,
                name: firstPlayer
            },{
                id: secondPlayerId,
                name: secondPlayer
            }]
          
           
          });
      }
      
      toggleAddScoresModal = e =>{
        this.setState({
            addScores: !this.state.addScores
          });
      }

      toggleModal = e =>{
        this.setState({
            editGame: !this.state.editGame
        })
      }

      editGame(gameId){
       this.setState({
           editGame: true,
           gameId: gameId
        })
      }


      deleteGame(gameId) {
        if (window.confirm("Czy na pewno chcesz usunąć ten mecz?"))
        {
          fetch(`${process.env.REACT_APP_API}`+"game?id="+gameId, { 
            method:'DELETE',
            header:{'Accept': 'application/json',
            'Content-Type':'applicaton/json'
          }
          })
          .then(function(response){
              // eslint-disable-next-line 
            if (response.status == 200) {
              return response.text().then(function(message ){alert(message )})
          } else {
              return response.text().then(function(message ){alert(message)})
          }
          })
          window.location.reload();
        }
      }

}    
export default Game;
