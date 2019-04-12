import React, { Component } from 'react';
import data from "./data.json";
import PlayDetails from "./Play/PlayDetails";
import './App.css';

class App extends Component {
  state = {
    allData: data,
    filter: {
      title: "",
      troupe: "",
      year: "",
      myRole: ""
    }
  }
  
  render() {
    let allPlays = this.state.allData.filter(play=>{
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
    }).reverse().map((play, index) => {
      return (
        <PlayDetails key={index} title={play.title}
        epoch={play.epoch}
        datePrecision={play["date-precision"]}
        datesAsText={play["dates-as-text"]}
        verb={play.verb}
        by={play.by}
        byArray={play["by-array"]}
        synopsis={play.synopsis}
        myActingRole={play["my-acting-role"]}
        mySongsLyricized={play["my-songs-lyricized"]}
        exampleLyric={play["example-lyric"]}
        tags={play["tags-batch-one"].concat(play["tags-batch-two"])}
        posterOrientation={play["poster-orientation"]}
        image500={play["photo-url-max-width-500"]}/>
      )
    })
    return (
      <div className="App">
        {allPlays}
      </div>
    );
  }
}

export default App;