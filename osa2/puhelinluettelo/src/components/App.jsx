import React, { useState } from 'react'


const Persons = ({contacts}) => {
    return(<div>
        {contacts.map(contact => <p key={contact.name}>{contact.name} {contact.number}</p>)}
    </div>)


}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',number: "040-1231244" }
  ]) 
  const [ newContact, setNewContact ] = useState('')

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
      setPersons(persons.concat({name: newContact.name,number: newContact.number}))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>name: <input id="nameInput" placeholder="Lisää nimi" onChange={handleChange}/></div>  
        <div>number: <input id="numberInput" placeholder="Lisää numero" onChange={handleChange}/></div>  
        <div>
          <button type="submit" onClick={addContact}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons contacts={persons}/>
    </div>
  )

}

export default App