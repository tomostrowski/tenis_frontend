import React, { Component } from "react";

export default class AddPlayerToList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    let nam = event.target.name;
    let val = event.target.value;

    this.setState({ [nam]: val });
  };

  handleSubmit(event) {
    alert(
      "Dodano nowego zawodnika : " + this.state.name + " " + this.state.surname
    );
    event.preventDefault();
    this.postToApi();
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <table className="table table-hover">
            <tbody>
              <tr>
                <th scope="row"></th>
                <td>
                  <input
                    name="name"
                    placeholder="Imię"
                    onChange={this.handleChange}
                  />
                </td>
                <td>
                  <input
                    name="surname"
                    placeholder="Nazwisko"
                    onChange={this.handleChange}
                  />
                </td>
                <td>
                  <button type="submit" className="btn btn-sm">
                    Dodaj
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </React.Fragment>
    );
  }

  async postToApi() {
    try {
      let result = await fetch(
        `${process.env.REACT_APP_API}/player`,
        {
          method: "post",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          },

          body: JSON.stringify({
            name: this.state.name,
            surname: this.state.surname
          })
        }
      );

      console.log("Rezultat:" + result);
    } catch (e) {
      console.log(e);
    }
  }
}
