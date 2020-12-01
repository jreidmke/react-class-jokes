import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  constructor(props) {
    super(props);
    this.upVote = this.upVote.bind(this)
    this.downVote = this.downVote.bind(this)
  }

  upVote() {
    this.props.vote(this.props.id, +1);
  }

  downVote() {
    this.props.vote(this.props.id, -1);
  }

  render() {
    return(
      <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={this.upVote}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={this.downVote}>
          <i className="fas fa-thumbs-down" />
        </button>

        {this.props.votes}
      </div>

      <div className="Joke-text">{this.props.text}</div>
    </div>
    )
  }
}

export default Joke;

// function Joke({ vote, votes, text, id }) {//props will be put in constructor
//   const upVote = () => vote(id, +1); //upVote method will be bound in reformat
//   const downVote = () => vote(id, -1);//downVote method will be bound in reformat

//   return (//return will start with render() func
//     <div className="Joke">
//       <div className="Joke-votearea">
//         <button onClick={upVote}>
//           <i className="fas fa-thumbs-up" />
//         </button>

//         <button onClick={downVote}>
//           <i className="fas fa-thumbs-down" />
//         </button>

//         {votes}
//       </div>

//       <div className="Joke-text">{text}</div>
//     </div>
//   );
// }