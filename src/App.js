import React, { Component } from 'react';
import data from "./data.json";
import './App.css';

class App extends Component {
  state = {
    allData: []
  }
  componentDidMount() {
    this.setState({allData: data})
  }
  render() {
    return (
      <div className="App">
        Hello, world!
      </div>
    );
  }
}

export default App;