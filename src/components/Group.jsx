import React, { Component } from 'react';
import PlayerListInGroup from './PlayerListInGroup';
import Game from './Game';

const URL = `${process.env.REACT_APP_API}/group/`;

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: this.props.groupId,
            name:"Nazwa",
            url: "/player",
            players:[],
            isLoading: true,
            playerStats:[]
         }
    }

    async componentDidMount() {
      // const groups = await (await fetch("http://tenis-projekt.herokuapp.com/api/group/all")).json(); // ZMIENIC!!!!!!!!!!!!!!!!!!!!!!!
      const group = await (await fetch(URL+ this.props.match.params.groupId)).json();
      this.setState({ id:group.id,name:group.name, players:group.players,isLoading: false });

      const playerStats = await (await fetch(URL+ this.props.match.params.groupId+"/getPlayers")).json();
      this.setState({playerStats});
    }

    render() { 
        // const {group} = this.state;
        const btnClass = "btn btn-light btn-sm float-right hidden";
        const penClass = "fas fa-pencil-alt float-right";

        return ( 
            <div>
            <hr />
            <form onSubmit={this.handleSubmit} id="editPlayerForm" >
            <table className="table table-hover col-md-6">
                    <tr>
                        <td><span class="fas fa-sync-alt" onClick={()=>this.reloadPage()}></span></td>
                        <td colSpan="4" ><span className="fas fa-trash-alt float-right" onClick={()=> this.deleteGroup(this.state.id)}> Usuń</span></td>
                    </tr>
                <tbody>
                    <tr>
                         <td colSpan="2">
                            <h2>
                            <input id="nameInput" name="name" type="text" placeholder={this.state.name} className="input-edit" onFocus={this.handleFocus} onChange={this.handleChange} disabled />  
                            </h2>
                    </td>
                        <td ><button type="submit" id="nameSaveBtn" className={btnClass} onClick={this.saveInput}>Zapisz</button></td>
                        <td ><button id="nameCancelBtn" className={btnClass} onClick={this.cancelHandle}>Anuluj</button></td>
                        <td><span id="nameSpan" className={penClass} onClick={this.editInput}></span></td>
                    </tr>
               </tbody>
            </table>
            </form> 
                                  
            <PlayerListInGroup groupId={this.props.match.params.groupId} groupName={this.state.name}/>
            <Game playerId="0" groupId={this.props.match.params.groupId} groupName={this.state.name}/>
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
        
       
        let url = URL+this.state.id+"/name="+this.state.name;
        this.patchApi(url);
        // alert(url);
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

      async patchApi(url) {
        try {
          let result = await fetch(url,
            {
              method: "PATCH",
              mode: "cors",
              headers: {
                Accept: "application/json",
                "Content-type": "application/json"
              },
            })
        } catch (e) {
          console.log(e);
        }
      }

}
 
export default Group;