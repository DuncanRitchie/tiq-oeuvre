import React, { Component } from 'react';
import data from "./data.json";
import PlayDetails from "./Play/PlayDetails";
import './App.css';

class App extends Component {
  state = {
    allData: data
  }
  
  render() {
    let allPlays = this.state.allData.reverse().map((play, index) => {
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