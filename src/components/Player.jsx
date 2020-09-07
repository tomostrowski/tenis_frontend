import React, { Component } from "react";
import GroupCombo from "./GroupCombo";
import PlayerListInGroup from "./PlayerListInGroup"
import Game from "./Game"

const URL = `${process.env.REACT_APP_API}/player/`;

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",  
      name: "Imię",
      surname: "Nazwisko",
      email: "Email",
      groups: [{id:0, name:"Brak"}],
      isLoading: true,
      playerInfo: [],
      isEditing: false
    };
  }
  
  changeGroup(groupId) {
    this.setState({
      groups: [{id:groupId}],
      groupId: groupId
   })
   this.addGroup(groupId);
  //  alert(groupId);
  }

  async componentDidMount() {
    const urlToApi= URL+ this.props.match.params.playerId;
    const urlToApiGroup= URL+"/getGroupInfo="+ this.props.match.params.playerId;

    const player = await (await fetch(urlToApi)).json();
        this.setState({
          id: player.id,
          name: player.name,
          surname: player.surname,
          email: player.email,
          groups: [{name: "Nazwa grupy"}],   
          isLoading: false,
          isEditing: false,
        });
    const groups = await (await fetch(urlToApiGroup)).json();
        this.setState({groups});
  }

  render() {
    const btnClass = "btn btn-light btn-sm float-right hidden";
    const penClass = "fas fa-pencil-alt float-right";
    const p = this.state;
    const {groups} = this.state;
    let key =100;
    
    return (
      <div>
        <h3>Pozycja w rankingu: </h3>
        <hr />
        <form onSubmit={this.handleSubmit} id="editPlayerForm" >
        <table className="table table-hover col-md-6" key={key++}>
          <tbody key={key++}>
          <tr>
          <td><span className="fas fa-sync-alt" onClick={()=>this.reloadPage()}></span></td>
            <td colSpan="4" ><span className="fas fa-trash-alt float-right" onClick={()=> this.deletePlayer(p.id)}> Usuń</span></td>
          </tr>
            <tr>
              <td colSpan="2">
                <h2> 
                    <input id="nameInput" name="name" type="text" placeholder={p.name} className="input-edit" onFocus={this.handleFocus} onChange={this.handleChange} disabled />  
                </h2>
              </td>
              <td ><button type="submit" id="nameSaveBtn" className={btnClass} onClick={this.saveInput}>Zapisz</button></td>
              <td ><button id="nameCancelBtn" className={btnClass} onClick={this.cancelHandle}>Anuluj</button></td>
              <td><span id="nameSpan" className={penClass} onClick={this.editInput}></span></td>
            </tr>
            <tr>
              <td colSpan="2">
                <h2>
                    <input type="text" id="surnameInput"  name="surname" placeholder={p.surname} className="input-edit" onFocus={this.handleFocus} onChange={this.handleChange} disabled/> 
                </h2>
              </td>
              <td ><button type="submit" id="surnameSaveBtn" className={btnClass} onClick={this.saveInput}>Zapisz</button></td>
              <td ><button id="surnameCancelBtn" className={btnClass} onClick={this.cancelHandle}>Anuluj</button></td>
              <td><span id="surnameSpan" className={penClass} onClick={this.editInput}></span></td>
            </tr>
            <tr>
              <td colSpan="2">
                <h4>
                    <input type="email" id="emailInput"  name="email" placeholder={p.email} className="input-edit" onFocus={this.handleFocus} onChange={this.handleChange} disabled/> 
                </h4>
              </td>
              <td ><button type="submit" id="emailSaveBtn" className={btnClass} onClick={this.saveInput}>Zapisz</button></td>
              <td ><button id="emailCancelBtn" className={btnClass} onClick={this.cancelHandle}>Anuluj</button></td>       
              <td><span id="emailSpan" className={penClass} onClick={this.editInput}></span></td>
            </tr>
            {!groups.length?<>
            <tr>
            <td><b>Brak grupy</b></td>
              <td colSpan="4" ><span className="fas fa-plus float-right" onClick={()=>this.addNewGroup()}></span></td>
            </tr>
               {this.state.isEditing ?
                <tr>
                  <td colSpan="5"><GroupCombo data = {
                    { groupId: this.state.groupId, 
                      changeGroup: this.changeGroup.bind(this)}
                    }/>
                    </td>
                </tr>: <tr></tr>}
            </>:
            groups.filter(g=>g.id>0).map(group=><>
          <tr>
            <td><b>Grupa {group.name}</b></td>
            <td colSpan="4" ><span className="fas fa-plus float-right" onClick={()=>this.addNewGroup()}></span></td>
            <td colSpan="4" ><span className="fas fa-trash-alt float-right" onClick={()=> this.removeGroup(group.id)}></span></td>
            <td colSpan="4" ><span className="fas fa-eye-slash float-right" ></span></td>
          </tr>
          <tr key="1">
            <td>Liczba punktów: </td>
            <td ><input type="number" id={group.id+"pointsInput"} className="input-edit col-md-5" placeholder={group.points} onFocus={this.handleFocus} onChange={this.handleChange} disabled/></td>
            <td ><button type="submit" id={group.id+"pointsSaveBtn"} name={group.id} className={btnClass} onClick={this.saveInput}>Zapisz</button></td>
            <td ><button id={group.id+"pointsCancelBtn"} className={btnClass} onClick={this.cancelHandle}>Anuluj</button></td>       
            <td><span id={group.id+"pointsSpan"} className={penClass} onClick={this.editInput}></span></td>
          </tr>
          <tr>
            <td >Rozegrane mecze:</td>
            <td colSpan="4"><span type="text" id="gamesInput" className="col-md-5">{group.allMatches}</span> </td>
          </tr>
          <tr>
            <td>Wygrane mecze:</td>
            <td><input type="number" id={group.id+"wonMatchesInput"} name="wonMatches" className="input-edit col-md-5" placeholder={group.wonMatches} onFocus={this.handleFocus} onChange={this.handleChange} disabled/></td>
            <td ><button type="submit" id={group.id+"wonMatchesSaveBtn"} name={group.id} className={btnClass} onClick={this.saveInput}>Zapisz</button></td>
            <td ><button id={group.id+"wonMatchesCancelBtn"} className={btnClass} onClick={this.cancelHandle}>Anuluj</button></td>       
            <td><span id={group.id+"wonMatchesSpan"} className={penClass} onClick={this.editInput}></span></td>
          </tr>
          <tr>
            <td>Przegrane mecze:</td>
            <td><input type="number" id={group.id+"lostMatchesInput"} name="lostMatches" className="input-edit col-md-5" placeholder={group.lostMatches} onFocus={this.handleFocus} onChange={this.handleChange} disabled/></td>
            <td ><button type="submit" id={group.id+"lostMatchesSaveBtn"} name={group.id} className={btnClass} onClick={this.saveInput} >Zapisz</button></td>
            <td ><button id={group.id+"lostMatchesCancelBtn"} className={btnClass} onClick={this.cancelHandle}>Anuluj</button></td>       
            <td><span id={group.id+"lostMatchesSpan"} className={penClass} onClick={this.editInput}></span></td>
          </tr>
          {this.state.isEditing ?
          <tr>
            <td colSpan="5"><GroupCombo data = {
              { groupId: this.state.groupId, 
                changeGroup: this.changeGroup.bind(this)}
              }/>
              </td>
          </tr>: <tr></tr>}

          </>)}
          
          </tbody>
        </table>
      </form>
        <hr />
        {groups.filter(g=>g.id >0).map(filtered=><>
            <span><PlayerListInGroup groupId={filtered.id} groupName={filtered.name}/> </span> 
            <Game playerId={this.props.match.params.playerId} groupId={filtered.id} groupName={filtered.name}/>
            </>
          )}
  </div>
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

  if (val<0 ) {event.target.value =0}
  this.setState({
    [nam]: val
  })
}

handleChangeSelect =(event) =>{
  event.preventDefault();
  const val = event.target.value;
  const nam = event.target.name;

  this.setState({
    groups: [{id:val}]
  })
}

handleSubmit = (event) => {
  event.preventDefault();
}

deletePlayer(playerId) {
  if (window.confirm("Czy na pewno chcesz usunąć tego zawodnika?"))
  {
    fetch(URL+"?id="+playerId, { 
      method:'DELETE',
      header:{'Accept': 'application/json',
      'Content-Type':'applicaton/json'
    }
    })
    window.open("/");
  }
}
  
  editInput = (event) =>{
    const id = event.target.id.replace("Span","");
    
    const inputId = id+"Input";
    const saveBtnId = id+"SaveBtn";
    const cancelBtnId =  id+"CancelBtn";
    const input = document.getElementById(inputId);
    const save = document.getElementById(saveBtnId);
    const cancel = document.getElementById(cancelBtnId);

    if (id==="group") {
      this.setState({isEditing:true});
      } else {
        input.removeAttribute("disabled");
        input.style.color = "#ff0000";
      }
      save.style.visibility= "visible";
      cancel.style.visibility= "visible";
  }

  addNewGroup(){
    this.setState({isEditing:true});
  }
 
  saveInput =(event) => {
    let id = event.target.id.replace("SaveBtn","");
    const groupId = event.target.name;
    const player = this.state;
    const inputId = id+"Input";
    
    const saveBtnId = id+"SaveBtn";
    const cancelBtnId =  id+"CancelBtn";
    let url;
    const input = document.getElementById(inputId);
    const save = document.getElementById(saveBtnId);
    const cancel = document.getElementById(cancelBtnId);
    id = id.replace(/\d+/,"");
    if (id==="group") {
    } else if(id==="points" || id==="wonMatches" || id==="lostMatches") {  //to można jakoś ładniej zapisać 
      input.style.color = "#139263";
      input.disabled = "disabled";
      url = URL+player.id+"/group="+groupId+"/"+id+"="+input.value;
    } else {
      input.style.color = "#139263";
      input.disabled = "disabled";
      url = `${process.env.REACT_APP_API}/player/`+player.id+"/"+id+"="+input.value;
    }

    save.style.visibility= "hidden";
    cancel.style.visibility= "hidden";
    this.patchUpdate(url);
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
    if(id!=="group"){
    input.style.color = "#139263";
    input.disabled = "disabled";
    }
    save.style.visibility= "hidden";
    cancel.style.visibility= "hidden";
    window.location.reload();
  }

  async patchUpdate(url){
    alert(url)
     fetch(url,{
          method: 'PATCH',
          // mode: "CORS",
          header: {'Accept': 'application/json',
          'Content-Type':'applicaton/json'
          }
        })
        window.location.reload();
  }

  async clearGroups(){
    if (window.confirm("Czy na pewno usunąć wszytkie grupy tego zawodnika?\nOznacza to, że zostaną usunięte wszyskie statystyki tego zawodnika w tej grupie")){
      let url = URL+this.state.id+"/clearGroups";
      // alert(url);
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

  async addGroup(groupId){
    try{
     let url = URL+this.state.id+"/";
    isNaN(groupId)? url = url + "addGroupName="+groupId : url = url + "addGroup="+groupId;
    alert(url);
    fetch(url,{
      method: 'PATCH',
      // mode: "CORS",
      header: {'Accept': 'application/json',
      'Content-Type':'applicaton/json'
      }
    })
    window.location.reload();

    } catch(error){
      console.log(error);
    }
  }

  async removeGroup(groupId){
    if (window.confirm("Czy na pewno usunąć zawodnika z tej grupy?\nOznacza to, że zostaną usunięte wszyskie statystyki w tej grupie")){
      let url = URL+this.state.id+"/removeGroup="+groupId;
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
  

}
