import React, { Component, lazy, Suspense } from 'react';
import queryString from "query-string";
import jsonData from "../data.json";
import HeaderBar from "../HeaderBar/HeaderBar";
import Footer from "../Footer/Footer";
import '../App.css';
const PlayDetails = lazy(() => import("../Play/PlayDetails"));

const Loading = () => <section className="play-details"><p>Loading...</p></section>;

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
        const roles = {
            "actor":              "actor",
            "assistant-director": "assistant-director",
            "lyricist":           "lyricist",
            "photographer":       "photographer",
            "poster co-designer (with illustration by Alison Pitt)": "co-designer",
            "poster-designer":    "poster-designer",
            "programme-designer": "programme-designer",
        }
        const role = roles[e.currentTarget.textContent] || "";
        this.props.history.push("/?role="+role)
        this.refresh()
    }

    clearFilter = () => {
        this.props.history.push("/?")
        this.refresh()
    }

    getTroupeRubric = () => {
        const rubrics =  {
            "jigsaw-music-theatre":          "Jigsaw were founded in 1991 and now have about two dozen members aged seven to twelve.",
            "quartz-youth-theatre":          "Established in 2013, Quartz are the arm of TiQ for teenage thespians, with around 22 current members.",
            "rewind-youth-theatre":          "Rewind are primary-schoolchildren in the Chester suburb of Blacon, co-managed by TiQ and Cheshire Dance.",
            "handbag-of-harmonies":          "A Handbag of Harmonies are a choir of several dozen women from the Chester area.",
            "garden-quarter-association":    "The Garden Quarter is the suburb of Chester that TiQ are based in.",
            "chester-mystery-plays-cast":    "The Chester Mystery Plays are a huge feat every five years to retell Bible stories at Chester Cathedral; individual plays have been reprised in the city’s amphitheatre.",
            "theatre-in-the-quarter-adults": "TiQ was founded in 2005 to provide the residents of Chester with theatrical experiences alongside professional actors, as well as to run the children’s group Jigsaw (and later Quartz and Rewind)."
        };

        let troupeSlug = this.state.filter.troupe;
        return (rubrics[troupeSlug] || "");
    }

    filterPlays = () => {
        let filteredPlays = jsonData.filter(play=>{
            // bool is what will determine whether a play gets displayed or not
            let bool = play.isInOeuvre;
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
                play.byArraySlug.map((troupeSlug,index)=>{
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
                    yearBool = this.state.filter.year.includes(play.datesAsText.substr(0,4))
                }
                else {
                    yearBool = this.state.filter.year === play.datesAsText.substr(0,4) 
                }
                bool = bool && yearBool
            }
            if (this.state.filter.role) {
                let roleBool = false
                if (Array.isArray(this.state.filter.role)) {
                    this.state.filter.role.map(filterRole => {
                        roleBool = roleBool || play.myRoles.includes(filterRole)
                        return roleBool
                    })
                }
                else {
                    roleBool = play.myRoles.includes(this.state.filter.role)
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
                        upcomingBool = upcomingBool && date<play.epochLastPerformance
                    }
                    else {
                        upcomingBool = true
                    }
                }
                else {
                    upcomingBool = date<play.epochLastPerformance
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

    // `generateFilterParagraph` includes several local functions
    // that may be called in the final return statement.
    generateFilterParagraph(numPlays) {
        const generateFirstPartOfParagraph = () => {
            const maxNumPlays = jsonData.filter(play => play.isInOeuvre).length;
            if (numPlays === maxNumPlays) {
                return `Showing all ${numPlays} items. Click a date, troupe, role, title, or “upcoming” sticker to set a filter`;
            }
            else if (numPlays > 1) {
                return `Filtered to ${numPlays} productions`;
            }
            else if (numPlays === 1) {
                return "Filtered to one production";
            }
            else {
                return `Click “Clear filter” — there are no productions`;
            }
        }
        
        const generateRoleClause = () => {
            let roles = this.state.filter.role
            if (Array.isArray(this.state.filter.role)) {
                roles = this.state.filter.role.map(role => {return role.toLowerCase()}).join(" or ")
            }
            return ` where I was ${roles.toLowerCase()}`;
        }

        const generateYearClause = () => {
            let years = this.state.filter.year
            if (Array.isArray(years)) {
                years = years.join(" or ")
            }
            return ` performed in ${years}`;
        }

        const generateTroupeClause = () => {
            let troupeFound = this.state.filter.troupe;
            // This is what happens if the query is only one troupe.
            let playFound = jsonData.find(play=>{
                return play.byArraySlug.includes(this.state.filter.troupe)
                });
            if (playFound) {
                troupeFound = playFound.byArray[playFound.byArraySlug.findIndex(troupe=>{return troupe===this.state.filter.troupe})]
            }
            // This is what happens if the query contains multiple troupes.
            else if (Array.isArray(this.state.filter.troupe)) {
                let troupeNamesArray = this.state.filter.troupe.map((troupeSlug)=>{
                    if (jsonData.find(play=>{return play.byArraySlug.includes(troupeSlug)})) {
                        playFound = jsonData.find(play=>{return play.byArraySlug.includes(troupeSlug)});
                        let troupeIndex = playFound.byArraySlug.findIndex(troupe=>{return troupe===troupeSlug})
                        let troupeName = playFound.byArray[troupeIndex]
                        return (troupeName)
                    }
                    else {
                        return null
                    }
                })
                troupeFound = troupeNamesArray.filter((name)=>{return name!= null}).join(" or ")
            }
            // Let’s add whatever we have for the troupes into filterParagraph
            return ` by ${troupeFound}`;
        }

        const generateSlugClause = () => {
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
                    }).filter(title=>{return title!=null}).join("” or “")
                }
                // If titles is a single incorrect slug, we don’t do anything here.
            }
            return ` entitled “${titles}”`
        }

        const generateUpcomingClause = () => {
            return ` that ${numPlays===1 ? "has" : "have"} not been performed yet`
        }
        
        return (
            generateFirstPartOfParagraph()
            + (this.state.filter.role     ? generateRoleClause()     : "")
            + (this.state.filter.year     ? generateYearClause()     : "")
            + (this.state.filter.troupe   ? generateTroupeClause()   : "")
            + (this.state.filter.slug     ? generateSlugClause()     : "")
            + (this.state.filter.upcoming ? generateUpcomingClause() : "")
        );
    }

    render() {
        const filteredPlays = this.filterPlays();
        // Let’s calculate the number of plays to display.
        const numPlays = filteredPlays.length;
        // Generate the paragraph in the header describing the filter.
        const filterParagraph = this.generateFilterParagraph(numPlays);
        // Let’s create a PlayDetails element for every play.
        let mappedPlays = filteredPlays.map((play, index) => {
            return (
                    <PlayDetails 
                            key={index}
                            play={play}
                            slugHandler={this.slugHandler}
                            troupeHandler={this.troupeHandler}
                            yearHandler={this.yearHandler}
                            roleHandler={this.roleHandler}
                            upcomingHandler={this.upcomingHandler}
                            numPlays={numPlays}
                />
            )
        })
        // Wrap a <Suspense> element around it to allow for a Loading state.
        let mappedPlaysWithLazyLoading = <Suspense fallback={Loading()}>{mappedPlays}</Suspense>;
        
        // Let’s put everything together into Page.
        return (
            <div className="Page">
                <HeaderBar filter={this.state.filter} filterParagraph={filterParagraph} rubric={this.getTroupeRubric()} clearFilter={this.clearFilter}/>
                {mappedPlaysWithLazyLoading}
                <Footer/>
            </div>
        );
    }
}

export default Page