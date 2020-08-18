import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'



const getContacts = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {return response.data})



}

const createNew = (newObject)  => {
    console.log(newObject)
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
    
}

const updateExisting = (id,newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
    
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default 
{ 
    getContacts,
    createNew, 
    updateExisting,
    deleteContact
}