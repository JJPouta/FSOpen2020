import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = (props) => (

<button onClick={props.handleClick} style={{backgroundColor: props.bgColor,margin: props.margin,width:"75px"}}>
    {props.text}
</button>

)

const Results = (props) => (
  <p style={{color: "grey",fontSize: "14pt"}}>{props.text} {props.value} </p>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  
  return (
    <div>
      <h1 style={{color:"blue",textShadow:"grey 2px 2px 2px"}}>Give feedback</h1>
      <Button  handleClick={() => setGood(good + 1)} text="Good" bgColor="green" margin="10px"/>
      <Button  handleClick={() => setNeutral(neutral+1)}  text="Neutral" bgColor="yellow" margin="10px"/>
      <Button  handleClick={() => setBad(bad+1)} text="Bad" bgColor="red" margin="10px"/>
      <h1 style={{color:"blue",textShadow:"grey 2px 2px 2px"}}>Statistics</h1>
      <Results text="Good" value={good} color="green"/>
      <Results text="Neutral" value={neutral} color="yellow"/>
      <Results text="Bad" value={bad} color="red"/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)