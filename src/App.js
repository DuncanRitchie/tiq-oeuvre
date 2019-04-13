import React, { Component } from 'react';
import jsonData from "./data.json";
import PlayDetails from "./Play/PlayDetails";
import ReactHtmlParser from 'react-html-parser';
import './App.css';

class App extends Component {
  state = {
    allData: jsonData,
    filter: {
      title: "",
      troupe: "",
      year: "",
      myRole: ""
    }
  }
  
  titleHandler = (title) => {
    this.setState({filter: {title: title, troupe: "", year: "", myRole: ""}})
  }

  troupeHandler = (e) => {
    this.setState({filter: {title: "", troupe: e.target.textContent, year: "", myRole: ""}})
  }

  yearHandler = (e) => {
    this.setState({filter: {title: "", troupe: "", year: e.target.textContent.substr(0,4), myRole: ""}})
  }

  myRoleHandler = (e) => {
    let myRole = ""
    switch (e.target.textContent) {
      case "poster designer":
        myRole = "Poster Designer"
        break;
      case "programme designer":
        myRole = "Programme Designer"
        break;
      case "lyricist":
        myRole = "Lyricist"
        break;
      case "photographer":
        myRole = "Photographer"
        break;
      case "assistant-director":
        myRole = "Assistant Director"
        break;
      case "poster co-designer (with illustration by Alison Pitt)":
        myRole = "CoDesigner"
        break;
      default:
        myRole = ""
    }
    this.setState({filter: {title: "", troupe: "", year: "", myRole: myRole}})
  }

  render() {
    let filteredPlays = this.state.allData.filter(play=>{
      let bool = true;
      if (this.state.filter.title) {
        bool = bool && play.title===this.state.filter.title
      }
      if (this.state.filter.troupe) {
        bool = bool && play["by-array"].includes(this.state.filter.troupe)
      }
      if (this.state.filter.year) {
        bool = bool && play["dates-as-text"].substr(0,4) === this.state.filter.year
      }
      if (this.state.filter.myRole) {
        bool = bool && play["tags-batch-one"].concat(play["tags-batch-two"]).includes("Duncan as "+this.state.filter.myRole)
      }
      return bool
    })
    let numPlays = filteredPlays.length;
    let mappedPlays = filteredPlays.reverse().map((play, index) => {
      return (
        <PlayDetails key={index} title={play.title}
        epoch={play.epoch}
        datePrecision={play["date-precision"]}
        datesAsText={play["dates-as-text"]}
        verb={play.verb}
        by={play.by}
        byArray={play["by-array"]}
        synopsis={play.synopsis}s
        myActingRole={play["my-acting-role"]}
        mySongsLyricized={play["my-songs-lyricized"]}
        exampleLyric={play["example-lyric"]}
        tags={play["tags-batch-one"].concat(play["tags-batch-two"])}
        posterOrientation={play["poster-orientation"]}
        image500={play["photo-url-max-width-500"]}
        titleHandler={this.titleHandler}
        troupeHandler={this.troupeHandler}
        yearHandler={this.yearHandler}
        myRoleHandler={this.myRoleHandler}
        />
      )
    })
    let filterParagraph = "";
    if (numPlays > 1) {
      filterParagraph = "Filtered to productions"
    }
    else if (numPlays === 1) {
      filterParagraph = "Filtered to one production"
    }
    else {
      filterParagraph = `Click ${ReactHtmlParser("&ldquo;")}Clear filters${ReactHtmlParser("rdquo; &mdash;&nbsp;")}there are no productions`
    }
    if (this.state.filter.myRole) {
      filterParagraph += `${ReactHtmlParser("&nbsp;")}where I was ${this.state.filter.myRole.toLowerCase()}`
    }
    if (this.state.filter.year) {
      filterParagraph += `${ReactHtmlParser("&nbsp;")}performed in ${this.state.filter.year}`
    }
    if (this.state.filter.troupe) {
      filterParagraph += `${ReactHtmlParser("&nbsp;")}by ${ReactHtmlParser(this.state.filter.troupe)}`
    }
    if (this.state.filter.title) {
      filterParagraph += `${ReactHtmlParser("&nbsp;")}entitled ${ReactHtmlParser("&ldquo;"+this.state.filter.title+"&rdquo;")}`
    }
    // {this.state.filter.troupe ? `${ReactHtmlParser("&ensp;")}performed by ${ReactHtmlParser(this.state.filter.troupe)}` : ""}+
    // {this.state.filter.year ? `${ReactHtmlParser("&ensp;")}performed in ${this.state.filter.year}` : ""}+
    // {this.state.filter.title ? `${ReactHtmlParser("&ensp;")}entitled ${ReactHtmlParser("&ldquo;"+this.state.filter.title+"&rdquo;")}` : ""}
    // ) : "Showing all productions"} 
    return (
      <div className="App">
        <h1>Duncan&rsquo;s work with Theatre in the Quarter and associated groups</h1>
        <p>{filterParagraph}.</p>
        <p onClick={this.myRoleHandler}>Clear filters</p>
        {/* {this.state.filter === {title: "", troupe: "", year: "", myRole: ""} ? <p>Showing all.</p> : <p>Filtered to: </p>} */}
        {mappedPlays}
      </div>
    );
  }
}

export default App;