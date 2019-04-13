import React, { Component } from 'react';
import jsonData from "./data.json";
import HeaderBar from "./HeaderBar/HeaderBar";
import MappedPlays from "./MappedPlays/MappedPlays";
import PlayDetails from "./Play/PlayDetails";
import ReactHtmlParser from 'react-html-parser';
import './App.css';

class App extends Component {
  state = {
    filter: {
      title: "",
      troupe: "",
      year: "",
      myRole: ""
    }
  }
  
  titleHandler = (title) => {
    this.setState({
      filter: {title: title, troupe: "", year: "", myRole: ""}
    })
  }

  troupeHandler = (e) => {
    this.setState({
      filter: {title: "", troupe: e.currentTarget.textContent, year: "", myRole: ""}
    })
  }

  yearHandler = (e) => {
    this.setState({
      filter: {title: "", troupe: "", year: e.currentTarget.textContent.substr(0,4), myRole: ""}
    })
  }

  myRoleHandler = (e) => {
    let myRole = ""
    switch (e.currentTarget.textContent) {
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
      case "actor":
        myRole = "Actor"
        break;
      default:
        myRole = ""
    }
    this.setState({
      filter: {title: "", troupe: "", year: "", myRole: myRole}
    })
  }

  filterPlays = () => {
    let filteredPlays = jsonData.filter(play=>{
      let bool = true;
      if (play.title === "The Colour Snatchers &amp; Another Side") {
        bool = false
      }
      if (this.state.filter.title) {
        bool = bool && play.title===this.state.filter.title
      }
      if (this.state.filter.troupe) {
        let troupeBool = false;
        play["by-array"].map((troupeCode,index)=>{
          if (this.state.filter.troupe.includes(ReactHtmlParser(troupeCode))) {
            troupeBool = true
          }
          return troupeBool
        })
        bool = bool && troupeBool
      }
      if (this.state.filter.year) {
        bool = bool && play["dates-as-text"].substr(0,4) === this.state.filter.year
      }
      if (this.state.filter.myRole) {
        bool = bool && play["tags-batch-one"].concat(play["tags-batch-two"]).includes("Duncan as "+this.state.filter.myRole)
      }
      return bool
    })
    return filteredPlays.reverse()
  }

  render() {
    let numPlays = this.filterPlays().length;
    let mappedPlays = this.filterPlays().map((play, index) => {
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
    if (numPlays === jsonData.length-1) {
      filterParagraph = `Showing all ${numPlays} items. Click a date, troupe, role, or title to set a filter`
    }
    else if (numPlays > 1) {
      filterParagraph = `Filtered to ${numPlays} productions`
    }
    else if (numPlays === 1) {
      filterParagraph = "Filtered to one production"
    }
    else {
      filterParagraph = `Click ${ReactHtmlParser("&ldquo;")}Clear filters${ReactHtmlParser("&rdquo; &mdash;&nbsp;")}there are no productions`
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
    return (
      <div className="App">
        <HeaderBar filter={this.state.filter} filterParagraph={filterParagraph} clearFilter={this.myRoleHandler}/>
        <MappedPlays mappedPlays={mappedPlays} />
      </div>
    );
  }
}

export default App;