import React, {Component} from 'react';
import FindPlayer from "./FindPlayer";
import {Link} from 'react-router-dom';
import Modal from './Modal';
import AddPlayer from './AddPlayer';
  
const URL = `${process.env.REACT_APP_API}/group/`;

class PlayerListInGroup extends Component {
    state = { 
        url: "/player",
        playerStats: [],
        showModal: false
     }

     async componentDidMount() {
        const urlToApi= URL+this.props.groupId+"/getPlayers"
        const playerStats = await(await(fetch(urlToApi))).json();
        this.setState({playerStats});
      }
    render() { 
              const {playerStats} = this.state;
              let rating =1;
              let key = 100;
        return (
                      <React.Fragment>
                          
                          <h2>Lista zawodników: <b>{playerStats.length}</b></h2>
                            <Link to={"/group/"+this.props.groupId}><h5>Grupa {this.props.groupName}</h5></Link>
                            {this.state.isLoading ? <div className="loader"></div> : 
                            <div>
                            <table className="table table-hover" key={key++}>
                              <thead>
                                  <tr> 
                                  <th scope="col">#</th>
                                  <th scope="col">Imię</th>
                                  <th scope="col">Nazwisko</th>
                                  <th scope="col">Statystyki</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody key={key++}>
                                  {!playerStats.length ?<tr><td colspan="4">Brak zawodników lub problem z połączeniem z API</td></tr>: 
                                  <>{playerStats.map(player =>
                                      <tr key={key++}>
                                        <th scope="row" >{rating++}</th>
                              
                                          <td><Link to={`${this.state.url}/${player.id}`} >{player.name}</Link></td>
                                          <td><Link to={`${this.state.url}/${player.id}`}>{player.surname}</Link></td>
                                        
                                          <td>
                                          <div className="badge badge-light">
                                            <Link to={`${this.state.url}/${player.id}`} >
                                                <span className="badge m-2 badge-warning" >{player.points}</span>
                                                <span className="badge m-2 badge-success">{player.wonMatches}</span>
                                                <span className="badge m-2 badge-secondary">{player.lostMatches}</span>
                                            </Link>
                                            
                                            </div>
                                          </td>
                                          <td><span className="fas fa-trash-alt float-right" onClick={()=> this.deletePlayer(player.id)}></span></td>
                                          
                                      </tr>
                                  )} </>}
                                  </tbody>
                            </table>
                            {/* <Link to="/AddPlayer"><button className="btn btn-success btn-sm m-2"> Dodaj nowego zawodnika do tej grupy</button></Link> */}
                            
                            
                            

                            <button className="btn btn-success btn-sm m-2" onClick={e => {
                                  this.showModal();
                                    }}> Dodaj zawodnika </button>
           
                  <Modal showModalCallback={this.showModalCallback}  showModal={this.state.showModal} >
      {/* <AddGame groupId={this.props.groupId}/> */}
               <FindPlayer groupId={this.props.groupId}/>
               <AddPlayer />
               <button className="btn btn-secondary close-button" onClick={this.showModalCallback}>Anuluj</button>
               </Modal>

               {/* <button className="btn btn-success btn-sm m-2" onClick={e => {
                    this.showModal();
                }}> Dodaj mecz </button>
           
           <Modal showModalCallback={this.showModalCallback}  showModal={this.state.showModal} >
               <b>Dodaj mecz</b>
               <span>W grupie ...</span>
               <AddGame groupId={this.props.groupId}/>
               <button className="btn btn-secondary close-button" onClick={this.showModalCallback}>Anuluj</button>
               </Modal> */}


                            </div>
              }
                      {/* </form> */}
                      </React.Fragment>
                   );
              }
             
                reloadPage(){
                  window.location.reload();
                }
                
                handleFocus= (event) =>{
                  const id = event.target.id;
                  const input = document.getElementById(id);
                
                  input.placeholder="";
                  input.value="";
                
                }
                
                handleChange =(event) =>{
                  event.preventDefault();
                  const nam = event.target.name;
                  const val = event.target.value;
                
                  this.setState({
                    [nam]: val
                  })
                }
                
                handleChangeSelect =(event) =>{
                  event.preventDefault();
                  const val = event.target.value;
                  const nam = event.target.name;
                alert("value:"+val+"name"+nam);
                  this.setState({
                    groups: [{id:val}]
                  })
                }
                
                handleSubmit = (event) => {
                  event.preventDefault();
                }
            
                editInput = (event) =>{
                  const id = event.target.id.replace("Span","");
                  const inputId = id+"Input";
                  const saveBtnId = id+"SaveBtn";
                  const cancelBtnId =  id+"CancelBtn";
                
                  const input = document.getElementById(inputId);
                  const save = document.getElementById(saveBtnId);
                  const cancel = document.getElementById(cancelBtnId);
              
                  if (id==="groups") {
                    this.setState({isEditing:true});
                    } else {
                      input.removeAttribute("disabled");
                      input.style.color = "#ff0000";
                    }
                    
                    save.style.visibility= "visible";
                    cancel.style.visibility= "visible";
                  
                }
               
                saveInput =(event) => {
                  const id = event.target.id.replace("SaveBtn","");
              
                  const inputId = id+"Input";
                  const saveBtnId = id+"SaveBtn";
                  const cancelBtnId =  id+"CancelBtn";
              
                  const input = document.getElementById(inputId);
                  const save = document.getElementById(saveBtnId);
                  const cancel = document.getElementById(cancelBtnId);
              
                  input.style.color = "#139263";
                  input.disabled = "disabled";
                  save.style.visibility= "hidden";
                  cancel.style.visibility= "hidden";
              
                  this.patchApi();
                  window.location.reload();
                }
              
                cancelHandle =(event) => {
                  const id = event.target.id.replace("CancelBtn","");
                  const inputId = id+"Input";
                  const saveBtnId = id+"SaveBtn";
                  const cancelBtnId =  id+"CancelBtn";
                  const input = document.getElementById(inputId);
                  const save = document.getElementById(saveBtnId);
                  const cancel = document.getElementById(cancelBtnId);
              
                  input.style.color = "#139263";
                  input.disabled = "disabled";
              
                  save.style.visibility= "hidden";
                  cancel.style.visibility= "hidden";
                  window.location.reload();
                }
            
                async patchApi() {
                  const groupId = this.state.group.id;
                  try {
                    let result = await fetch(URL+groupId,
                      {
                        method: "PATCH",
                        mode: "cors",
                        headers: {
                          Accept: "application/json",
                          "Content-type": "application/json"
                        },
            
                        body: JSON.stringify(this.state.name).replace("\"","").replace("\"","")
                        
                      })
                      console.log("Wysłano do API: Rezultat:" + result+ "groupId:"+groupId);
                  } catch (e) {
                    console.log(e);
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

 
 

export default PlayerListInGroup;