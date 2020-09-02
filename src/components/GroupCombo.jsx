import React, { Component } from 'react';

class GroupCombo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            groups: [],
            // groupId: 0,
            name: "Nazwa grupy",
            isLoading: true
        };
    }

    render() { 
        const optionClass ="hidden"
        const  { groups } = this.state;
        return ( 
        <React.Fragment>
                {this.state.isLoading ? <div className="loader-mini"></div> :
                <>
                    {/* <td> */}
                       <select id="groupsInput" name="groups" className="form-control" onChange={this.handleChange} >
                               <option value="0" className={optionClass} selected hidden disabled>wybierz grupę </option>
                          {groups.map(group =>
                               <option value={group.id}>{group.name}</option>
                           )}
                       </select>   
                    {/* </td> */}
                    {/* <td ><button type="submit" id="groupsSaveBtn" className={btnClass} onClick={this.saveInput} >Zapisz</button></td>
                    <td ><button id="groupsCancelBtn" className={btnClass} onClick={this.cancelHandle}>Anuluj</button></td>
                    <td><span id="groupsSpan" className={penClass} onClick={this.editInput}></span></td> */}
                    </>
                }
        </React.Fragment> 
        );
    }

    async componentDidMount() {
        // const groups = await (await fetch("http://tenis-projekt.herokuapp.com/api/group/all")).json(); // ZMIENIC!!!!!!!!!!!!!!!!!!!!!!!
        const groups = await (await fetch(`${process.env.REACT_APP_API}/group/all`)).json();
        this.setState({ groups, isLoading: false });
        // console.log ("PLAYERS:"+players)
      }


      handleChange=(event)=>{
          const val = event.target.value;
          

        //   this.setState({groupId:val})
        //   alert("Value"+val+"_____"+"this.state.groupId: "+this.state.groupId);
        // //   this.props.parentCallback(this.state.groupId);
    
        this.props.data.changeGroup(val);
        // this.props.alert("HEJ");
    }
      


}
 

export default GroupCombo;
