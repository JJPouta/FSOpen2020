import React, { useState,useEffect,useRef} from 'react'
import contactService from "../services/contacts"


const DELETE_EVENT = "deletionEvent";
const UPDATE_EVENT = "updateEvent";
const ADDITION_EVENT = "addEvent";
const ERROR_EVENT = "errEvent";

const Persons = ({contacts,delFunc}) => {

  if(contacts.length > 0)
    {
      return(<div>
        {contacts.map(contact => <p key={contact.id}>{contact.name} {contact.number} <button key={contact.id} style={{background:"red",color:"white"}} onClick={() => delFunc(contact.id,contact.name)}>Delete</button></p>
        )}
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

const Notifications = ({message,messageType}) => {

switch (messageType) {
  case ADDITION_EVENT:
    return(<div style={{border: "2px solid green",color:"green",fontSize:"14pt"}}>Added {message}</div>)
  case DELETE_EVENT:
    return(<div style={{border: "2px solid red",color:"red",fontSize:"14pt"}}>Contact {message} has been removed</div>)
  case UPDATE_EVENT:
    return(<div style={{border: "2px solid blue",color:"blue",fontSize:"14pt"}}>Number for contact {message} has been updated</div>)
  case ERROR_EVENT:
    return(<div style={{border: "3px dashed red",color:"red",fontSize:"14pt"}}>Contact {message} has been already been removed from server</div>)
  default:
    return(<div>
      
    </div>)
}


}


const App = () => {
 
  const [ persons, setPersons] = useState([])
  const [ newContact, setNewContact ] = useState('')
  const [ visualData, changeVisualData] = useState(persons)
  const [ notification,setNotification] = useState("")


  const addContact = (event) => {
    event.preventDefault()
    
    let found = false

    persons.forEach(person => {
      
      if(person.name === newContact.name)
      {
        let res = window.confirm(`${newContact.name} is already added to phonebook.. replace the old number with new one?`)
        // Poistutaan jos cancel tai ruksi
        if(!res){return;}
        
        // Päivitetään numero ja vaihdetaan tila
        contactService
        .updateExisting(person.id,newContact).then(
          setNotification({...notification,
          name: person.name,
          type: UPDATE_EVENT,
          id: prev => prev + 1
          }))
          
          found = true
      }
    })

    if(!found)
    {
      // Luodaan uusi ja vaihdetaan tila
      contactService
        .createNew(newContact)
        .then(setNotification({...notification,
          name: newContact.name,
          type: ADDITION_EVENT,
          id: prev => prev + 1})
          )
        
    }
        

    // Nollataan input kentät
    document.getElementById("nameInput").value = null;
    document.getElementById("numberInput").value = null;
  }
  const removeContact = (id,name) => {


    let res = window.confirm(`Do you want to delete contact: ${name}?`)
    
    // Poistutaan jos cancel tai ruksi
    if(!res){return;}
    
    
    // Poistetaan ja vaihdetaan tila
    contactService
    .deleteContact(id)
    .then(
        setNotification({...notification,
          name: name,
          type: DELETE_EVENT,
          id: prev => prev + 1})
      ).catch(() => errorHandler(name))
      
  }

  const errorHandler = (contactName) => {

    setNotification({...notification,
      name: contactName,
      type: ERROR_EVENT,
      id: prev => prev + 1})
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
    contactService
      .getContacts()
        .then(initialContacts => {
          setPersons(initialContacts)
          changeVisualData(initialContacts)
      })
  }, [notification])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={notification.name} messageType={notification.type}/>
      <Filter func={filterContacts}/>
      <h2>Add new contact</h2>
      <AddContacts changeFunc={handleChange} addFunc={addContact}/>
      <h2>Numbers</h2>
      <Persons contacts={visualData} delFunc={removeContact}/>
    </div>
  )

}

export default App