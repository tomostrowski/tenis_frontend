import React, { Component } from 'react';

class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "" }
    }

    handleChange = (event) =>{
        const nam = event.target.name;
        const val = event.target.value;
    
        this.setState({
          [nam]: val
        })
      }
    
      handleSubmit = (event) => {
        event.preventDefault();
        this.postToApi();
        this.clearForm();
        
      }
    
      clearForm = () => { 
        document.getElementById("addGroupForm").reset();
      }


    render() { 
        return (
            <React.Fragment>
          <div className="page-height" onSubmit={this.handleSubmit}>
                <form className="background-layer" id="addGroupForm">
                <div className="form-group">
                    <label>Nazwa grupy</label>
                    <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="exampleInputName"
                    aria-describedby="nameHelp"
                    onChange={this.handleChange}
                    required
                    />
                </div>
                <button type="submit"
                type="submit" 
                className="submit"
                onSubmit={this.handleSubmit}
                >
                    Dodaj
                </button>
                </form>
          </div>
            </React.Fragment>
          );
    }

    async postToApi() {
        try {
          let result = await fetch(
            `${process.env.REACT_APP_API}/group`,
            {
              method: "post",
              mode: "cors",
              headers: {
                Accept: "application/json",
                "Content-type": "application/json"
              },
    
              body: JSON.stringify({
                name: this.state.name,
              })
            }
          );
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          console.log("Rezultat:" + result);
          window.location.reload();
        } catch (e) {
          console.log(e);
        }
      }
}
 



export default AddGroup;