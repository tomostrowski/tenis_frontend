import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import AddPlayer from './AddPlayer';

const URL= `${process.env.REACT_APP_API}/player/`;

export default class PlayersList extends Component {
  state = { 
    id:1,
    players: [],
    url: "/player",
    isLoading: true
   }
  render() { 
    const  { players } = this.state;
    let rating =1;
    let key =50;

  return ( 
<React.Fragment>
<h2>Lista zawodników</h2>
{this.state.isLoading ? <div className="loader"></div> : 
  
<div>
<table className="table table-hover">
  <thead>
      <tr> 
       <th scope="col">#</th>
       <th scope="col">Imię</th>
       <th scope="col">Nazwisko</th>
       <th scope="col"></th>
     </tr>
   </thead>
   <tbody>
      {!players.length ? <>Brak zawodników lub problem z połączeniem z API</>: 
      <>{players.map(player =>
          <tr key={key++}>
            <th scope="row" >{rating++}</th>
              <td><Link to={`${this.state.url}/${player.id}`}>{player.name}</Link></td>
              <td><Link to={`${this.state.url}/${player.id}`}>{player.surname}</Link></td>
              <td><span className="fas fa-trash-alt float-right" onClick={()=> this.deletePlayer(player.id)}></span></td>
          </tr>
      )} </>}
      </tbody>
</table>
<button className="btn btn-success btn-sm m-2" onClick={e => {
                    this.showModal();
                }}> Dodaj nowego zawodnika </button>
                
           <Modal showModalCallback={this.showModalCallback}  showModal={this.state.showModal} >
               <AddPlayer/>
            </Modal>
</div>
  }

</React.Fragment>
     );
  }
  
  async componentDidMount() {
    const players = await (await fetch(URL+"all")).json();
    this.setState({ players, isLoading: false });
  }

 deletePlayer(playerId) {
  if (window.confirm("Czy na pewno chcesz usunąć tego zawodnika?"))
  {
    fetch(URL+playerId, { 
      method:'DELETE',
      header:{'Accept': 'application/json',
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
}

showModal = e => {
  this.setState({
    showModal: !this.state.showMod
  });
};

showModalCallback = e =>{
    this.setState({
        showModal: !this.state.showModal
    })
}

}