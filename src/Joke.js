import React, { Component } from "react";
import "./Joke.css";

function Joke({ vote, votes, text, id }) {//props will be put in constructor
  const upVote = () => vote(id, +1); //upVote method will be bound in reformat
  const downVote = () => vote(id, -1);//downVote method will be bound in reformat

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={upVote}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={downVote}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}

export default Joke;

class Joke extends Component