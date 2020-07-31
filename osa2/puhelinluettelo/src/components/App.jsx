import React, { useState } from 'react'


const Persons = ({names}) => {
    
    return(<div>
        {names.map(contact => <p key={contact.name}>{contact.name}</p>)}
    </div>)


}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('Lisää nimi')

  const addContact = (event) => {
    event.preventDefault()
    
    let found = false

    persons.forEach(person => {
      
      if(person.name === newName)
      {
        alert(`${newName} is already added to phonebook`)
        found = true
      }
    })

    if(!found)
    {
      setPersons(persons.concat({name: newName}))
    }
    
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit" onClick={addContact}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons names={persons}/>
    </div>
  )

}

export default App