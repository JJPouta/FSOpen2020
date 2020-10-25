import axios from 'axios'
const baseUrl = '/api/persons'
var config = {headers: {'Content-Type': 'application/json','Cache-Control' : 'no-cache'}};

const getContacts = () => {
    const request = axios.get(baseUrl,config)
    return request.then(response => response.data)



}

const createNew = (newObject)  => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
    
}

const updateExisting = (id,newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
    
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