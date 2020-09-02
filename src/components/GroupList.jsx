import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Modal from './Modal';
import AddGroup from './AddGroup';


const URL = `${process.env.REACT_APP_API}/group/`;

class GroupList extends Component {
    state = { 
        id: 1,
        name: "Nazwa grupy",
        url: "/group",
        isLoading: true,
        showModal: false
    }
    
    render() { 
        console.log(">>>>>>>> długość tablicy groups: ",this.state.groups)
        const  { groups } = this.state;
        let key = 30;
        let rating =1;
        return ( <React.Fragment>
            <h2>Lista grup</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nazwa</th>
                        <th>Liczba zawodników</th>
                        <th></th>
                    </tr>
                </thead>
                {this.state.isLoading?<div className="loader"></div>:<>
                <tbody>
                {!groups.length?<tr><td>Brak grup</td></tr>:<>{groups.map(group =>
                    <tr key={group.id}>
                        <td><b>{rating++}</b></td>
                        <td><Link to={`${this.state.url}/${group.id}`}>{group.name}</Link></td>
                        <td>
                            {group.players.length}
                        </td>
                        <td><span className="fas fa-trash-alt float-right" onClick={()=> this.deleteGroup(group.id)}></span></td>
                    </tr>
                )}</>}
                </tbody></>}
            </table>
            <button className="btn btn-success btn-sm m-2" onClick={e => {
                    this.showModal();
                }}> Dodaj nową grupę </button>
                
           <Modal showModalCallback={this.showModalCallback}  showModal={this.state.showModal} >
               <AddGroup/>
            </Modal>
        </React.Fragment> );
    }

    async componentDidMount() {
        const groups = await (await fetch(URL+"all")).json();
      
        this.setState({ groups, isLoading: false });
      }

      deleteGroup(groupId) {
        if (window.confirm("Czy na pewno chcesz usunąć tę grupę?"))
        {
          fetch(URL+groupId, { 
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


export default GroupList;
