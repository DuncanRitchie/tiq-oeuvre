import React, { Component } from 'react';
import queryString from "query-string";
import ReactHtmlParser from 'react-html-parser';
import jsonData from "../data.json";
import HeaderBar from "../HeaderBar/HeaderBar";
import MappedPlays from "../MappedPlays/MappedPlays";
import PlayDetails from "../Play/PlayDetails";
import '../App.css';

class Page extends Component {
  state = {
    filter: {
      slug: queryString.parse(window.location.search).slug || "",
      troupe: queryString.parse(window.location.search).troupe || "",
      year: queryString.parse(window.location.search).year || "",
      role: queryString.parse(window.location.search).role || "",
      upcoming: queryString.parse(window.location.search).upcoming || false
    }
  }

  refresh = () => {
        this.setState({
            filter: {
            slug: queryString.parse(window.location.search).slug || "",
            troupe: queryString.parse(window.location.search).troupe || "",
            year: queryString.parse(window.location.search).year || "",
            role: queryString.parse(window.location.search).role || "",
            upcoming: queryString.parse(window.location.search).upcoming || false
            }
        })
      }

  slugHandler = (slug) => {
    this.props.history.push("/?slug="+slug)
    this.refresh()
  }

  troupeHandler = (troupe) => {
    this.props.history.push("/?troupe="+troupe)
    this.refresh()
  }

  yearHandler = (e) => {
    this.props.history.push("/?year="+e.currentTarget.textContent.substr(0,4))
    this.refresh()
  }

  upcomingHandler = () => {
    this.props.history.push("/?upcoming=true")
    this.refresh()
  }

  roleHandler = (e) => {
    let role = ""
    switch (e.currentTarget.textContent) {
      case "poster-designer":
        role = "poster-designer"
        break;
      case "programme-designer":
        role = "programme-designer"
        break;
      case "lyricist":
        role = "lyricist"
        break;
      case "photographer":
        role = "photographer"
        break;
      case "assistant-director":
        role = "assistant-director"
        break;
      case "poster co-designer (with illustration by Alison Pitt)":
        role = "co-designer"
        break;
      case "actor":
        role = "actor"
        break;
      default:
        role = ""
    }
    this.props.history.push("/?role="+role)
    this.refresh()
  }

  clearFilter = () => {
    this.props.history.push("/?")
    this.refresh()
  }

  troupeRubric = () => {
    let troupeSlug = this.state.filter.troupe
    let rubric = ""
    switch (troupeSlug) {
      case "jigsaw-music-theatre":
        rubric = "Jigsaw were founded in 1991 and now have about two dozen members aged seven to twelve."
        break
      case "quartz-youth-theatre":
        rubric = "Established in 2013, Quartz are the arm of TiQ for teenage thespians, with around 22 current members."
        break
      case "rewind-youth-theatre":
        rubric = "Rewind are primary-schoolchildren in the Chester suburb of Blacon, co-managed by TiQ and Cheshire Dance."
        break
      case "handbag-of-harmonies":
        rubric = "A Handbag of Harmonies are a choir of several dozen women from the Chester area."
        break
      case "garden-quarter-association":
        rubric = "The Garden Quarter is the suburb of Chester that TiQ are based in."
        break
      case "chester-mystery-plays-cast":
        rubric = "The Chester Mystery Plays are a huge feat every five years to retell Bible stories at Chester Cathedral; individual plays have been reprised in the city&rsquo;s amphitheatre."
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
      // bool is what will determine whether a play gets displayed or not
      let bool = play["is-in-oeuvre"];
      if (this.state.filter.slug) {
        let slugBool = false
        if (Array.isArray(this.state.filter.slug)) {
          slugBool = this.state.filter.slug.includes(play.slug)
        }
        else {
          slugBool = play.slug===this.state.filter.slug
        }
        bool = bool && slugBool
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
        let yearBool = false
        if (Array.isArray(this.state.filter.year)) {
          yearBool = this.state.filter.year.includes(play["dates-as-text"].substr(0,4))
        }
        else {
          yearBool = this.state.filter.year === play["dates-as-text"].substr(0,4) 
        }
        bool = bool && yearBool
      }
      if (this.state.filter.role) {
        let roleBool = false
        if (Array.isArray(this.state.filter.role)) {
          this.state.filter.role.map(filterRole => {
            roleBool = roleBool || play["tags-batch-one"].concat(play["tags-batch-two"]).includes("Duncan as "+filterRole)
            return roleBool
          })
        }
        else {
          roleBool = play["tags-batch-one"].concat(play["tags-batch-two"]).includes("Duncan as "+this.state.filter.role)
        }
        bool = bool && roleBool
      }
      if (this.state.filter.upcoming) {
        let date = new Date().getTime()/1000
        let upcomingFilterBool = true;
        let upcomingBool = true
        if (this.state.filter.upcoming === "false") {
          upcomingBool = true;
          upcomingFilterBool = false;
        }
        else if (Array.isArray(this.state.filter.upcoming)) {
          upcomingFilterBool = false
          this.state.filter.upcoming.map(upcoming => {
            upcomingFilterBool = upcomingFilterBool || upcoming==="true"
            return upcomingFilterBool
          })
          if (upcomingFilterBool) {
            upcomingBool = upcomingBool && date<play["epoch-last-performance"]
          }
          else {
            upcomingBool = true
          }
        }
        else {
          upcomingBool = date<play["epoch-last-performance"]
        }
        if (this.state.filter.upcoming !== upcomingFilterBool) {
          let newFilter = {
            role: this.state.filter.role,
            slug: this.state.filter.slug,
            troupe: this.state.filter.troupe,
            upcoming: upcomingFilterBool,
            year: this.state.filter.year
          }
          this.setState({filter: newFilter})
        }
        bool = bool && upcomingBool
      }
      return bool
    })
    return filteredPlays.reverse()
  }

  render() {
    // Let's calculate the number of plays to display.
    let numPlays = this.filterPlays().length;
    // Let's create a PlayDetails element for every play.
    let mappedPlays = this.filterPlays().map((play, index) => {
      return (
        <PlayDetails 
        key={index} 
        title={play.title}
        slug={play.slug}
        epoch={play.epoch}
        epochLastPerformance={play["epoch-last-performance"]}
        datePrecision={play["date-precision"]}
        datesAsText={play["dates-as-text"]}
        verb={play.verb}
        byArray={play["by-array"]}
        byArraySlug={play["by-array-slug"]}
        synopsis={play.synopsis}
        myActingRole={play["my-acting-role"]}
        mySongsLyricized={play["my-songs-lyricized"]}
        exampleLyric={play["example-lyric"]}
        tags={play["tags-batch-one"].concat(play["tags-batch-two"])}
        posterOrientation={play["poster-orientation"]}
        cloudinary={play.cloudinary}
        slugHandler={this.slugHandler}
        troupeHandler={this.troupeHandler}
        yearHandler={this.yearHandler}
        roleHandler={this.roleHandler}
        upcomingHandler={this.upcomingHandler}
        />
      )
    })
    // Let's make our filterParagraph.
    let filterParagraph = "";
    // The first part of filterParagraph depends on the number of plays displayed.
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
    // The latter parts of filterParagraph depends on the filter set.
    //If there is a role/s in the filter...
    if (this.state.filter.role) {
      let roles = this.state.filter.role
      if (Array.isArray(this.state.filter.role)) {
        roles = this.state.filter.role.map(role => {return role.toLowerCase()}).join(" or ")
      }
      filterParagraph += `${ReactHtmlParser("&nbsp;")}where I was ${roles.toLowerCase()}`
    }
    // If there is a year/s in the filter...
    if (this.state.filter.year) {
      let years = this.state.filter.year
      if (Array.isArray(years)) {
        years = years.join(" or ")
      }
      filterParagraph += `${ReactHtmlParser("&nbsp;")}performed in ${years}`
    }
    // If there is a troupe/s in the filter...
    if (this.state.filter.troupe) {
      // troupeFound is the string that will be added to filterParagraph to represent the troupe(s).
      let troupeFound = this.state.filter.troupe;
      // This is what happens if the query is only one troupe.
      let playFound = jsonData.find(play=>{
        return play["by-array-slug"].includes(this.state.filter.troupe)
        });
      if (playFound) {
        troupeFound = playFound["by-array"][playFound["by-array-slug"].findIndex(troupe=>{return troupe===this.state.filter.troupe})]
      }
      // This is what happens if the query contains multiple troupes.
      else if (Array.isArray(this.state.filter.troupe)) {
        let troupeNamesArray = this.state.filter.troupe.map((troupeSlug)=>{
          if (jsonData.find(play=>{return play["by-array-slug"].includes(troupeSlug)})) {
            playFound = jsonData.find(play=>{return play["by-array-slug"].includes(troupeSlug)});
            let troupeIndex = playFound["by-array-slug"].findIndex(troupe=>{return troupe===troupeSlug})
            let troupeName = playFound["by-array"][troupeIndex]
            return (troupeName)
          }
          else {
            return null
          }
        })
        troupeFound = troupeNamesArray.filter((name)=>{return name!= null}).join(" or ")
      }
      // Let's add whatever we have for the troupes into filterParagraph
      filterParagraph += `${ReactHtmlParser("&nbsp;")}by ${ReactHtmlParser(troupeFound)}`
    }
    // If there is a slug in the filter...
    if (this.state.filter.slug) {
      let titles = this.state.filter.slug
      // If titles is a single slug in the Json data, the corresponding title is returned.
      if (jsonData.find(play=>{return play.slug===titles})) {
        titles = jsonData.find(play=>{return play.slug===titles}).title
      }
      // If titles is not a single slug, or not in the Json data...
      else {
        // If titles is an array of slugs, we want to return a title for every slug.
        if (Array.isArray(titles)) {
          titles = titles.map(slug => {
            if (jsonData.find(play=>{return play.slug===slug})) {
              return jsonData.find(play=>{return play.slug===slug}).title
            }
            else {
              return null
            }
          }).filter(title=>{return title!=null}).join("&rdquo; or &ldquo;")
        }
        // If titles is a single incorrect slug, we don't do anything here.
      }
      filterParagraph += `${ReactHtmlParser("&nbsp;")}entitled ${ReactHtmlParser("&ldquo;"+titles+"&rdquo;")}`
    }
    // If there is upcoming:true in the filter...
    if (this.state.filter.upcoming) {
      filterParagraph += `${ReactHtmlParser("&nbsp;")}that ${numPlays===1 ? "has" : "have"} not been performed yet`
    }
    // Let's put everything together into Page.
    return (
      <div className="Page">
        <HeaderBar filter={this.state.filter} filterParagraph={filterParagraph} rubric={ReactHtmlParser(this.troupeRubric())} clearFilter={this.clearFilter}/>
        <MappedPlays mappedPlays={mappedPlays} />
      </div>
    );
  }
}

export default Page