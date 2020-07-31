import React, { useState } from 'react'


const Persons = ({contacts}) => {
    return(<div>
        {contacts.map(contact => <p key={contact.name}>{contact.name} {contact.number}</p>)}
    </div>)


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
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
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