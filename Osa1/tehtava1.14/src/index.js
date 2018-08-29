import React from 'react'
import ReactDOM from 'react-dom'

function Anecdote(text) {
  this.text = text
  this.votes = 0
}

const anecdotes = [
  new Anecdote('If it hurts, do it more often'),
  new Anecdote('Adding manpower to a late software project makes it later!'),
  new Anecdote('The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'),
  new Anecdote('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'),
  new Anecdote('Premature optimization is the root of all evil.'),
  new Anecdote('Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.')
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      highestVotedAnecdote: new Anecdote('')
    }
    this.setSelectedRandomly = this.setSelectedRandomly.bind(this)
    this.addVote = this.addVote.bind(this)      
  }

  setSelectedRandomly(max) {
    this.setState({
      selected: Math.floor(Math.random() * Math.floor(max))
    }) 
  }
  
  addVote(index) {
    this.props.anecdotes[index].votes += 1
    this.setHighestVotedAnecdote()   
  }

  setHighestVotedAnecdote() {
    // make a copy of original array (otherwise original array gets mutated)
    var tmp = [...this.props.anecdotes]
    // sort the array by votes (most voted in first index)
    var sorted = tmp.sort(function(a,b) {
      return b.votes - a.votes
    })

    this.setState({
      highestVotedAnecdote: {
        text: sorted[0].text,
        votes: sorted[0].votes
      }
    }) 
  }
  
  render() {
    return (      
      <div>        
        <div>
          {this.props.anecdotes[this.state.selected].text}.<br />         
          has {this.props.anecdotes[this.state.selected].votes} votes
        </div>      
        <div>
          <button onClick={() => this.addVote(this.state.selected)}>vote</button>
          <button onClick={() => this.setSelectedRandomly(this.props.anecdotes.length)}>next anecdote</button>        
        </div>                
        <HighestVotedAnecdote obj={this.state.highestVotedAnecdote} />
      </div>            
    )
  }
}

function HighestVotedAnecdote(anecdote) {
  if (anecdote.obj.votes > 0) {
    return (
      <div>
        <h1>anecdote with most votes:</h1>  
        <p>
          {anecdote.obj.text}<br />
          has {anecdote.obj.votes} votes
        </p>
      </div>
    )
  }
  return null  
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)