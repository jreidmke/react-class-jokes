import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
  }

  componentDidUpdate() {
    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
  }

  async getJokes() {
    try {
      let jokes = this.state.jokes;
      let votes = JSON.parse(
        window.localStorage.getItem('votes')
      );
      let seen = new Set(jokes.map(j=>j.id));

      while(jokes.length < this.props.length) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        }).data;
        if(!seen.has(res.id)) {
          seen.add(res.id);
          votes[res.id] = votes[res.id] || 0;
          jokes.push({ ...res.joke, votes: votes[res.id]});
        } else {
          console.log("duplicate found!");
        }
      }
      this.setState({ jokes });
      window.localStorage.setItem("votes", JSON.stringify(votes));

    } catch (error) {
      console.log(error);
    }
  }

  generateNewJokes() {
    this.setState({ jokes: []});
  }

  vote(id, delta) {
    let votes = JSON.parse(window.localStorage.getItem("votes"));
    votes[id] = (votes[id] || 0) + delta;
    window.localStorage.setItem("votes", JSON.stringify(votes));
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }));
  }

  render() {
    let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

    return (
      <div className="JokeList">
        <button
          className="JokeList-getmore"
          onClick={this.generateNewJokes}
        >
          Get New Jokes
        </button>

        {sortedJokes.map(j => (
          <Joke
            text={j.joke}
            votes={j.votes}
            vote={this.vote}
          />
        ))}

        {sortedJokes.length < this.props.length ? (
          <div className="loading">
            <i className="fas fa-4x fa-spinner fa-spin" />
          </div>
        ) : null}
      </div>
    );
  }
}


export default JokeList;

// function JokeList({ numJokesToGet = 10 }) {
  //   const [jokes, setJokes] = useState([]);//state and props will be set in constructor

  //   /* get jokes if there are no jokes */

  //   useEffect(function() {// no use effect! this means I'll need to use those component mount functions
  //     async function getJokes() { //means this will be outside of useEffect
  //       let j = [...jokes];//spreads joke array
  //       let seen = new Set();//creates a set to keep track of unique joke ids
  //       try {
  //         while (j.length < numJokesToGet) {//while j array length < props, reqs made
  //           let res = await axios.get("https://icanhazdadjoke.com", {
  //             headers: { Accept: "application/json" } //don't forget that header ugh
  //           });
  //           let { status, ...jokeObj } = res.data;//destructure status and jokeObj from resp

  //           if (!seen.has(jokeObj.id)) {//if new joke id is not in set
  //             seen.add(jokeObj.id); //add it to set
  //             j.push({ ...jokeObj, votes: 0 }); //and push it in our j (jokes array)
  //           } else {
  //             console.error("duplicate found!"); //other wise, you get an error
  //           }
  //         }
  //         setJokes(j); //set our jokes state equal to our j array. i like this style
  //       } catch (e) {
  //         console.log(e); //console log that error
  //       }
  //     }

  //     if (jokes.length === 0) getJokes();//if jokes.length = 0, fire off this function
  //   }, [jokes, numJokesToGet]);//this function will only run when jokes is changed outside of the useEffect

  //   /* empty joke list and then call getJokes */

  //   function generateNewJokes() {//resets joke state when button pushed
  //     setJokes([]);
  //   }

  //   /* change vote for this id by delta (+1 or -1) */

  //   function vote(id, delta) {//increments or decrements joke based on change. this function would be better if it were clearer. readability over slickness dog
  //     setJokes(allJokes =>
  //       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
  //     );
  //   }

  //   /* render: either loading spinner or list of sorted jokes. */

  //   if (jokes.length) {
  //     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);//creates sort with callback

  //     return (//returns component
  //       <div className="JokeList">
  //         <button className="JokeList-getmore" onClick={generateNewJokes}>
  //           Get New Jokes
  //         </button>

  //         {sortedJokes.map(j => (
  //           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
  //         ))}
  //       </div>
  //     );
  //   }

  //   return null;

  // }