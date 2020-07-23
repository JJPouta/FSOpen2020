import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
 return(
 <h1>{props.headerName}</h1>
 )

}

const Content = (props) => {

return(<p>{props.contentID} {props.eAmount}</p>
  )
}

const Total = (props) => {

return (<p>Number of exercises {props.totalAmount}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header headerName={course}/>
      <Content contentID={part1} eAmount={exercises1}/>
      <Content contentID={part2} eAmount={exercises2}/>
      <Content contentID={part3} eAmount={exercises3}/>
      <Total totalAmount={exercises1+exercises2+exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))