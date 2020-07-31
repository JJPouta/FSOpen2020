import React from 'react'

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

const Course = ({courses}) => {


const countTotal = (courseParts) => {
    const total = courseParts.reduce((tot,currValue) => {return tot + currValue.exercises},0)
    return total
}

return(
<div>
{courses.map(course => 
    <>
    <Header headerName={course.name}/>
    <Content courseParts={course.parts}/>
    <p style={{fontWeight: "bold"}}>Number of exercises {countTotal(course.parts)}</p>
    </>
)}
</div>)

}

export default Course