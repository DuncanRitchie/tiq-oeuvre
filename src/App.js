import React, { Component } from 'react';
import jsonData from "./data.json";
import HeaderBar from "./HeaderBar/HeaderBar";
import MappedPlays from "./MappedPlays/MappedPlays";
import PlayDetails from "./Play/PlayDetails";
import queryString from "query-string";
import ReactHtmlParser from 'react-html-parser';
import './App.css';

class App extends Component {
  state = {
    filter: {
      slug: queryString.parse(window.location.search).slug || "",
      troupe: queryString.parse(window.location.search).troupe || "",
      year: queryString.parse(window.location.search).year || "",
      myRole: queryString.parse(window.location.search).role || "",
      upcoming: queryString.parse(window.location.search).upcoming || false
    }
  }
  
  slugHandler = (slug) => {
    window.location.search = "slug="+slug
  }

  troupeHandler = (slug) => {
    window.location.search = "troupe="+slug
  }

  yearHandler = (e) => {
    window.location.search = "year="+e.currentTarget.textContent.substr(0,4)
  }

  upcomingHandler = () => {
    window.location.search = "upcoming=true"
  }

  myRoleHandler = (e) => {
    let myRole = ""
    switch (e.currentTarget.textContent) {
      case "poster-designer":
        myRole = "poster-designer"
        break;
      case "programme-designer":
        myRole = "programme-designer"
        break;
      case "lyricist":
        myRole = "lyricist"
        break;
      case "photographer":
        myRole = "photographer"
        break;
      case "assistant-director":
        myRole = "assistant-director"
        break;
      case "poster co-designer (with illustration by Alison Pitt)":
        myRole = "co-designer"
        break;
      case "actor":
        myRole = "actor"
        break;
      default:
        myRole = ""
    }
    window.location.search = "role="+myRole
  }

  clearFilter = () => {
    window.location.search = ""
  }

  troupeRubric = () => {
    let troupeSlug = this.state.filter.troupe
    let rubric = ""
    switch (troupeSlug) {
      case "jigsaw-music-theatre":
        rubric = "Jigsaw were founded in 1991 and are now under the TiQ umbrella, with about two dozen members aged between seven and twelve."
        break
      case "quartz-youth-theatre":
        rubric = "Established in 2013, Quartz are the arm of TiQ for teenage thespians, with around 19 current members."
        break
      case "rewind-youth-theatre":
        rubric = "Rewind are a company of primary-schoolchildren in the Chester suburb of Blacon; they are co-managed by TiQ and Cheshire Dance."
        break
      case "handbag-of-harmonies":
        rubric = "A Handbag of Harmonies are a choir of several dozen women from the Chester area, with handbags, feather boas, and a huge repertoire arranged by their managing director, Matt Baker."
        break
      case "garden-quarter-association":
        rubric = "The Garden Quarter is the suburb of Chester that TiQ are based in."
        break
      case "chester-mystery-plays-cast":
        rubric = "The Chester Mystery Plays are a huge dramatic endeavour every five years (the next cycle will be in 2023) to retell Bible stories in or around Chester Cathedral; individual plays have also been reprised in Chester&rsquo;s amphitheatre."
        break
      case "theatre-in-the-quarter-adults":
        rubric = "TiQ was founded in 2005 to provide the residents of Chester with theatrical experiences alongside professional actors, as well as to run the children&rsquo;s group Jigsaw (and later Quartz and Rewind)."
        break
      default:
        rubric = ""
    }
    return (rubric)
  }

  filterPlays = () => {
    let filteredPlays = jsonData.filter(play=>{
      let bool = play["is-in-oeuvre"];
      if (this.state.filter.slug) {
        bool = bool && play.slug===this.state.filter.slug
      }
      if (this.state.filter.troupe) {
        let troupeBool = false;
        play["by-array-slug"].map((troupeSlug,index)=>{
          if (this.state.filter.troupe.includes(troupeSlug)) {
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
      if (this.state.filter.upcoming) {
        let date = new Date().getTime()/1000
        bool = bool && date<play.epoch
      }
      return bool
    })
    return filteredPlays.reverse()
  }

  render() {
    let numPlays = this.filterPlays().length;
    let mappedPlays = this.filterPlays().map((play, index) => {
      return (
        <PlayDetails 
        key={index} 
        title={play.title}
        slug={play.slug}
        epoch={play.epoch}
        datePrecision={play["date-precision"]}
        datesAsText={play["dates-as-text"]}
        verb={play.verb}
        byArray={play["by-array"]}
        byArraySlug={play["by-array-slug"]}
        synopsis={play.synopsis}s
        myActingRole={play["my-acting-role"]}
        mySongsLyricized={play["my-songs-lyricized"]}
        exampleLyric={play["example-lyric"]}
        tags={play["tags-batch-one"].concat(play["tags-batch-two"])}
        posterOrientation={play["poster-orientation"]}
        image500={play["photo-url-max-width-500"]}
        slugHandler={this.slugHandler}
        troupeHandler={this.troupeHandler}
        yearHandler={this.yearHandler}
        myRoleHandler={this.myRoleHandler}
        upcomingHandler={this.upcomingHandler}
        />
      )
    })
    let filterParagraph = "";
    if (numPlays === jsonData.filter(play=>{return play["is-in-oeuvre"]}).length) {
      filterParagraph = `Showing all ${numPlays} items. Click a date, troupe, role, title, or ${ReactHtmlParser("&ldquo;upcoming&rdquo;")} sticker to set a filter`
    }
    else if (numPlays > 1) {
      filterParagraph = `Filtered to ${numPlays} productions`
    }
    else if (numPlays === 1) {
      filterParagraph = "Filtered to one production"
    }
    else {
      filterParagraph = `Click ${ReactHtmlParser("&ldquo;")}Clear filter${ReactHtmlParser("&rdquo; &mdash;&nbsp;")}there are no productions`
    }
    if (this.state.filter.myRole) {
      filterParagraph += `${ReactHtmlParser("&nbsp;")}where I was ${this.state.filter.myRole.toLowerCase()}`
    }
    if (this.state.filter.year) {
      filterParagraph += `${ReactHtmlParser("&nbsp;")}performed in ${this.state.filter.year}`
    }
    if (this.state.filter.troupe) {
      let playFound = jsonData.find(play=>{return play["by-array-slug"].includes(this.state.filter.troupe)});
      let troupeFound = this.state.filter.troupe;
      if (playFound) {
        troupeFound = playFound["by-array"][playFound["by-array-slug"].findIndex(troupe=>{return troupe===this.state.filter.troupe})]
      }
      filterParagraph += `${ReactHtmlParser("&nbsp;")}by ${ReactHtmlParser(troupeFound)}`
    }
    if (this.state.filter.slug) {
      if (jsonData.find(play=>{return play.slug===this.state.filter.slug})) {
        let playTitle = jsonData.find(play=>{return play.slug===this.state.filter.slug}).title
        filterParagraph += `${ReactHtmlParser("&nbsp;")}entitled ${ReactHtmlParser("&ldquo;"+playTitle+"&rdquo;")}`
      }
      else {
        filterParagraph += `${ReactHtmlParser("&nbsp;")}with the slug ${ReactHtmlParser("&ldquo;"+this.state.filter.slug+"&rdquo;")}`
      }
    }
    if (this.state.filter.upcoming) {
      filterParagraph += `${ReactHtmlParser("&nbsp;")}that ${numPlays===1 ? "has" : "have"} not been performed yet`
    }
    return (
      <div className="App">
        <HeaderBar filter={this.state.filter} filterParagraph={filterParagraph} rubric={ReactHtmlParser(this.troupeRubric())} clearFilter={this.clearFilter}/>
        <MappedPlays mappedPlays={mappedPlays} />
      </div>
    );
  }
}

export default App;