import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.city.value);
    // search for data about city
    this.setstate({
      city: e.target.city.value
    });
  };

  handleInputChange = (e) => {
    this.setState({
      city: e.target.value
    });
  };

  render() {



    return (
      <>
        <h1>city explorer</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Search for a city
            <input type="text" name="city" onChange={this.handleInputChange}></input>
          </label>
          <button type="submit">Search for a City</button>
        </form>
      </>
    )
  }
}

export default App;
