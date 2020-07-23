import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
 return(
 <h1>{props.headerName}</h1>
 )

}

const Content = () => {
  return(<div>
      <Part contentID='Half Stack application development' eAmount={10}/>
      <Part contentID='Using props to pass data' eAmount={7}/>
      <Part contentID='State of a component' eAmount={14}/>
    </div>)
}

const Part = (props) => 
{
  return(<p>{props.contentID} {props.eAmount}</p>
    )
  
}
const Total = (props) => {

return (<p>Number of exercises {props.totalAmount}</p>)
}

const App = () => {
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <div>
      <Header headerName={course}/>
      <Content/>
      <Total totalAmount={exercises1+exercises2+exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))