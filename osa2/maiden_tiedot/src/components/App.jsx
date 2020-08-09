import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import Axios from "axios";


  
const Filter = ({func}) => ( 
    <form>
      <div>
        Find country <input id="nameFilter" placeholder="Enter county" onChange={func}/>
      </div>
    </form>)

const DataView = (props) => {

    if(props.countrylist.length > 1 && props.countrylist.length < 11)
    {
        return(<div>
            {props.countrylist.map(country => <p key={country.name}>{country.name}</p>)}
        
        </div>)
    }
    else if(props.countrylist.length == 0)
    {
        return(<div></div>)
    }
    else if(props.countrylist.length > 10)
    {
        return(<div>
            <p>Too many matches, specify another filter</p>
        </div>)
    }
    else if(props.countrylist.length == 1)
    {
        
        return(
            <SingleCountryView singleCountry={props.countrylist[0]}/>
       )
    }
}

const SingleCountryView = ({singleCountry}) => {
    
    return(<div>
        <h1>{singleCountry.name}</h1>
        <p>Capital: {singleCountry.capital}</p>
        <p>Population: {singleCountry.population}</p>
        <h2>Languages</h2>
        <ul>
            {singleCountry.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img src={singleCountry.flag} style={{maxHeight:"80px",maxWidth:"80px"}}></img>
    </div>)
    
}

const App = () => {

    const [allCountries,getCountries] = useState([])
    const [shownCountries,changeShownData] = useState([])

    const filterCountries = (event) => {

        let inputText = event.target.value;
        
        // Jos kenttään on syötetty tietoa
        if(inputText)
        {
            let filteredData = allCountries.filter(country => country.name.toLowerCase().includes(inputText.toLowerCase()))
            changeShownData(filteredData)
        }
        else
        {
            changeShownData(allCountries)
        }
    }
    
    useEffect(() => {
        Axios.get("https://restcountries.eu/rest/v2/all")
        .then(response => {console.log(response.data)
        getCountries(response.data)
        changeShownData(response.data)})

    },[])


return(
<div>
<Filter func={filterCountries}></Filter>
<DataView countrylist={shownCountries}></DataView>
</div>)
}

export default App;