import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Page from "./Page/Page"

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/tiq-oeuvre">
        <Route component={Page}/>
      </BrowserRouter>
    )
  }
}

export default App