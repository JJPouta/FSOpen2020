import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = (props) => (

<button onClick={props.handleClick} style={{backgroundColor: props.bgColor,margin: props.margin,width:"100px"}}>
    {props.text}
</button>

)


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
  const points = new Uint8Array(anecdotes.length); 
  const copyOfPoints = {...points};

  let maxVotes = 0;

  const randomAnecdote = () => {return(anecdotes[Math.floor(Math.random() * Math.floor(anecdotes.length))])}
  
  const voteAnecdote = () => {

    let anecdoteIndx = anecdotes.indexOf(selected);
    copyOfPoints[anecdoteIndx] += 1;
    let largest = Math.max.apply(Math, copyOfPoints); 
    let indxOfLargest = anecdotes.indexOf(largest);
    return(anecdotes[indxOfLargest])
  }


  return (
    <div>
      <h1 style={{color:"purple",textShadow:"grey 2px 2px 2px"}}>Anecdote of the day</h1>
      <Button handleClick={() => setVoted(voteAnecdote())} text="vote" margin="10px" bgColor="silver"/>
      <Button handleClick={() => setSelected(randomAnecdote())} text="next anecdote" bgColor="gold"/>
      <p style={{fontWeight:"bold"}}>{selected}</p>
      <h1 style={{color:"purple",textShadow:"grey 2px 2px 2px"}}>Anecdote with most votes</h1>
      <p style={{fontWeight:"bold"}}>{mostVoted} with {maxVotes} votes</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)