import React, { useState,useEffect } from 'react'
import axios from 'axios' 

const Persons = ({contacts}) => {

  if(contacts.length > 0)
    {
      return(<div>
        {contacts.map(contact => <p key={contact.name}>{contact.name} {contact.number}</p>)}
      </div>)
    }
    else
    {
      return(<div></div>)
    }    

}

const Filter = ({func}) => ( 
<form>
  <div>
    filter shown with <input id="nameFilter" placeholder="Filter text" onChange={func}/>
  </div>
</form>)

const AddContacts = ({changeFunc,addFunc}) => (

  <form>
    <div>name: <input id="nameInput" placeholder="Add name" onChange={changeFunc}/></div>  
    <div>number: <input id="numberInput" placeholder="Add number" onChange={changeFunc}/></div>  
    <div>
      <button type="submit" onClick={addFunc}>add</button>
    </div>
  </form>
)

const App = () => {
 
  const [ persons, setPersons] = useState([])
  const [ newContact, setNewContact ] = useState('')
  const [ visualData, changeVisualData] = useState(persons)

  const addContact = (event) => {
    event.preventDefault()
    
    let found = false

    persons.forEach(person => {
      
      if(person.name === newContact.name)
      {
        alert(`${newContact.name} is already added to phonebook`)
        found = true
      }
    })

    if(!found)
    {
      let newPersons = persons.concat({name: newContact.name,number: newContact.number})
      setPersons(newPersons)
      changeVisualData(newPersons)
    }
    
  }

  const handleChange = (event) => {
    if(event.target.id === "nameInput")
    {
      setNewContact({...newContact, name: event.target.value})
    }
    else if(event.target.id === "numberInput")
    {
      setNewContact({...newContact, number: event.target.value})
    }
  }

  const filterContacts = (event) => {

    let inputText = event.target.value;
    
    // Jos kenttään on syötetty tietoa
    if(inputText)
    {
      let filteredData = persons.filter(person => person.name.toLowerCase().includes(inputText.toLowerCase()))
      changeVisualData(filteredData)
    }
    else
    {
      changeVisualData(persons)
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/db')
      .then(response => {
        setPersons(response.data.persons)
        changeVisualData(response.data.persons)
        
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter func={filterContacts}/>
      <h2>Add new contact</h2>
      <AddContacts changeFunc={handleChange} addFunc={addContact}/>
      <h2>Numbers</h2>
      <Persons contacts={visualData}/>
    </div>
  )

}

export default App