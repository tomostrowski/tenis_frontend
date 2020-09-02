import React from "react";

class PlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Imię",
      surname: "Nazwisko"
    };
    // this.handleChange = this.handleChange.bind(this);
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
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Imię:
          <input type="text" name="name" onChange={this.handleChange} />
        </label>
        <label>
          Nazwisko:
          <input type="text" name="surname" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Dodaj" />
      </form>
    );
  }
}

export default PlayerForm;
