import React, { Component } from "react";


// const API = process.env.REACT_APP_API;
export class AddPlayer extends Component {


  constructor(props){
    super(props)
    this.state={
      name: "",
      surname: "",
      email: "",
      points: 0,
      wonMatches: 0,
      lostMatches: 0
    }
  }

   
  render() {
    return (
      <React.Fragment>
        <div className="page-height">
          <h3>Dodawanie nowego zawodnika</h3>
          <div className="center">

            <form className="background-layer" onSubmit={this.handleSubmit} id="addPlayerForm" action="/home">
              <div id="messagePlayerAdded" className="messageOK ">Dodano nowego zawodnika</div>
              <div className="form-group">
                <label>Imię</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="exampleInputName"
                  aria-describedby="nameHelp"
                  onChange={this.handleChange}
                  required
                />
                <label>Nazwisko</label>
                <input
                  type="text"
                  name="surname"
                  className="form-control"
                  id="exampleInputSurname"
                  aria-describedby="nameHelp"
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="exampleInputEmail1">e-mail</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={this.handleChange}
                />
                <div id="emailHelp" className="form-text text-muted">
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Hasło</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="checkSendEmailToPlayer"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Wyślij maila z wiadomością do zawodnika
                </label>
              </div>
              <button type="submit" className="submit">
                Dodaj
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
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
    this.showMeseage();
  }

  clearForm = () => { 
    document.getElementById("addPlayerForm").reset();
  }

  showMeseage = () => { 
    document.getElementById("messagePlayerAdded").style.visibility ="visible";
  }

  async postToApi() {
    const urlToApi = `${process.env.REACT_APP_API}/player`;
    try {
            let result = await fetch(
              urlToApi,
        {
          method: "post",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
          })
        }
      );

      console.log("Rezultat:" + result);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }
}

export default AddPlayer;
