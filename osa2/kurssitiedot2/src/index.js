import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {

  return(
 <h1>{props.headerName}</h1>
 )

}

const Content = (props) => {

  return(<div>
    {props.courseParts.map(element => <Part key={element.id} contentID={element.name} eAmount={element.exercises}/>)}
    </div>)
}

const Part = ({contentID,eAmount}) => 
{
  return(<p>{contentID} {eAmount}</p>
    )
  
}

const Course = ({course}) => {


const total = course.parts.reduce((tot,currValue) => {return tot + currValue.exercises},0)
  
return(
<div>
  <Header headerName={course.name}/>
  <Content courseParts={course.parts}/>
  <p>Number of exercises {total}</p>
</div>)

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))