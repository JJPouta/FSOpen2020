import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
 return(
 <h1>{props.headerName}</h1>
 )

}

const Content = (props) => {
  
  let components =  []
  
  props.parts.forEach(element => components.push(<Part contentID={element.name} eAmount={element.exercises}/>))

  return(<div>
    {components}
    </div>)
}

const Part = (props) => 
{
  return(<p>{props.contentID} {props.eAmount}</p>
    )
  
}
const Total = (props) => {

let i = 0;

props.parts.forEach(element => i = element.exercises + i)

return (<p>Number of exercises {i}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header headerName={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))