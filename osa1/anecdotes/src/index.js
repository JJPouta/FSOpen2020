import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = (props) => (

<button onClick={props.handleClick} style={{backgroundColor: props.bgColor,margin: props.margin,width:"100px"}}>
    {props.text}
</button>

)

const AnecdoteLine = ({text,votes}) => {

    if(text)
    {
      return(<p style={{fontWeight:"bold"}}>{text} has {votes} votes</p>)

    }
    else
    {
      return(<p></p>)
    }
}


const VoteLine = (props) => {

  if(props.voteCount > 0){return(

    <p style={{fontWeight:"bold"}}>{props.mostVoted} with {props.voteCount} votes</p>
  )}
  else
  {
    return(<p style={{fontWeight:"bold"}}>No votes given</p>)
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const App = () => {

  const [selected, setSelected] = useState("")
  const [mostVoted,setVoted] = useState("")
  const [points,keepScore] = useState(new Uint8Array(anecdotes.length)); 
  
  const randomAnecdote = () => {
    
    const newIndex = Math.floor(Math.random() * Math.floor(anecdotes.length))
    const newValue = {
      index: newIndex,
      text:anecdotes[newIndex],
      votes:points[newIndex]
    }
    setSelected(newValue)
  }
  
  const voteAnecdote = (indx) => {
    const newPoints = [...points]
    newPoints[indx] = newPoints[indx] + 1
    keepScore(newPoints)
    getMostVoted();
  }

  const getMostVoted = () => {
    
    const maxVotes = Math.max(...points)
    const getMaxVotedIndex = () => {return(points.indexOf(maxVotes))}
    const maxVotedIndex = getMaxVotedIndex();
    const mostVotedAnectode = {
      votes: maxVotes,
      text: anecdotes[maxVotedIndex]
    }
    setVoted(mostVotedAnectode)

  }

  return (
    <div>
      <h1 style={{color:"purple",textShadow:"grey 2px 2px 2px"}}>Anecdote of the day</h1>
      <Button handleClick={() => voteAnecdote(selected.index)} text="vote" margin="10px" bgColor="silver"/>
      <Button handleClick={() => randomAnecdote()} text="next anecdote" bgColor="gold"/>
      <AnecdoteLine text={selected.text} votes={selected.votes}></AnecdoteLine>
      <h1 style={{color:"purple",textShadow:"grey 2px 2px 2px"}}>Anecdote with most votes</h1>
      <VoteLine voteCount={mostVoted.votes} mostVoted={mostVoted.text}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)