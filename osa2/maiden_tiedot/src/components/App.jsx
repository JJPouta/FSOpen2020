import React, {useEffect,useState} from 'react';
import Axios from "axios";

  
const Filter = ({func}) => {
    
    return(<form>
            <div>
            Find country <input id="nameFilter" placeholder="Enter county" onChange={func}/>
            </div>
    </form>)

}
    
    
    

const DataView = ({countrylist,func,weatherData}) => {


    if(countrylist.length > 1 && countrylist.length < 11)
    {
        return(
        <div>
            {countrylist.map(country => <p key={country.name}>{country.name} <button id={country.name} onClick={() => func(country)}>show</button></p>)} 
        </div>)
    }
    else if(countrylist.length === 0)
    {
        return(<div></div>)
    }
    else if(countrylist.length > 10)
    {
        return(<div>
            <p>Too many matches, specify another filter</p>
        </div>)
    }
    else if(countrylist.length === 1)
    {
        return(<SingleCountryView singleCountry={countrylist[0]} weatherData={weatherData}></SingleCountryView>)
       
    }
}

const SingleCountryView = ({singleCountry,weatherData}) => {
    
    return(<div>
        <h1>{singleCountry.name}</h1>
        <p>Capital: {singleCountry.capital}</p>
        <p>Population: {singleCountry.population}</p>
        <h2>Languages</h2>
        <ul>
            {singleCountry.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img src={singleCountry.flag} style={{maxHeight:"80px",maxWidth:"80px"}} alt="flag"></img>
        <WeatherForecast capital={singleCountry.capital} weatherData={weatherData}/>
    </div>)
    
}

const WeatherForecast = ({capital,weatherData}) => {

    return(<div>
        <h2>Weather in {capital}</h2>
        <p><span style={{fontWeight:"bold"}}>Temperature:</span>{weatherData.current.temperature}</p>
        <img src={weatherData.weather_icons[0]} alt="weathericon"></img>
        <p><span style={{fontWeight:"bold"}}>Wind:</span>{weatherData.current.wind_speed}</p>
    </div>

    )

}


const App = () => {

    const [allCountries,getCountries] = useState([])
    const [shownCountries,changeShownData] = useState([])
    const [weatherData,setWeatherData] = useState([])
    const wsApiKey = process.env.REACT_APP_API_KEY

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
            changeShownData([])
        }
    }
    
    const singleCountryView = (country) => {
       
        changeShownData([country])
        setWeatherData(() => 
            useEffect(() => {
                const apiQuery = `http://api.weatherstack.com/current?access_key=${wsApiKey}&query=${country.capital}` 
                Axios.get(apiQuery)
                .then(response => {
                return(response.data)
                })
        })

        )
    }

    useEffect(() => {
        Axios.get("https://restcountries.eu/rest/v2/all")
        .then(response => {
        getCountries(response.data)
        })

    },[])

    

    

return(
<div>
<Filter func={filterCountries}></Filter>
<DataView countrylist={shownCountries} func={singleCountryView} weatherData={weatherData}></DataView>
</div>)
}

export default App;