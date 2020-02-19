import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      placeHolder: "Tapez votre film..."
    };
  }
  render() {
    return (
      <div className="row">
        <div className="input-group">
        <input
        type="text"
        className="form-control input-lg"
          onChange={this.handleChange.bind(this)}
          placeholder={this.state.placeHolder}
        />
        <span className="input-group-button">
          <button className="btn btn-secondary" onClick="">Chercher</button>
        </span>
      </div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ searchText: event.target.value });
  }
}

export default SearchBar;
