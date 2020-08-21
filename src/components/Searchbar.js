import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider, Header, Icon, Table, Image, Dimmer, Loader, Segment } from 'semantic-ui-react';
import '../assets/Searchbar.scss';

const Searchbar = () => {

    const [country, setCountry] = useState('');
    const [results, setResults] = useState([]);
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);

   useEffect(() => {
   
      const timeoutId = setTimeout(() => {
          if (country) {
              setCountry(country);
              
          }
      }, 1000)

      return () => {
          clearTimeout(timeoutId)
      };
   }, [country]);

   
   const searchCountry = async () => {

    const response = await axios.get('https://covid-19-data.p.rapidapi.com/country', {
    params: { 
        "name": country,},
    headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "52a09c55b9msh1d8ae6c2bc12c81p195a6cjsnb31ddf28d95e",
        "useQueryString": true
        }
    });
    console.log(response.data[0]);
    setResults(response.data)
    setLoading(true)
    
}

    const searchImage = async () => {
        
        const response = await axios.get('https://api.unsplash.com/search/photos', {
        headers: {
            Authorization: process.env.REACT_APP_UNSPLASH_API_KEY
        },
        params: {
            query: country
        }
    });
    setImage(response.data.results[0].urls.small);
    setLoading(true)
}

   const renderedResults = results.map((result) => {
       //format dates
       const lastUpdated = new Date(result.lastUpdate).toLocaleDateString()
       //format cases
       const confirmedCases = new Intl.NumberFormat('en-US').format(result.confirmed)
       const deaths = new Intl.NumberFormat('en-US').format(result.deaths)
       const recovered = new Intl.NumberFormat('en-US').format(result.recovered)
       
       
       return (
        <div key={result.country}>
            <Divider horizontal>
                <Header as='h4'>
                <Icon name='location arrow' />
                Country
                </Header>
            </Divider>
    
        <p>
            {result.country}
        </p>
    
        <Divider horizontal>
            <Header as='h4'>
            <Icon name='bar chart' />
            Details
            </Header>
        </Divider>
    
        <Table definition>
            <Table.Body>
            <Table.Row>
                <Table.Cell width={2}>Confirmed Cases</Table.Cell>
                <Table.Cell>{confirmedCases}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Deaths</Table.Cell>
                <Table.Cell>{deaths}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Recovered</Table.Cell>
                <Table.Cell>{recovered}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Last Updated</Table.Cell>
                <Table.Cell>{lastUpdated}</Table.Cell>
            </Table.Row>
            </Table.Body>
        </Table>
    </div>
       )
 
   })

 

    return (
        <div className="verticalAlign">
            <div className="ui segment searchbar">
                <h3 className="searchbar__title">Covid-19 Cases Per Country</h3>
                <form
                    className="ui form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        searchCountry(country)
                        searchImage(country)
                        }
                    }
                >
                    <Image src={image} fluid />
                    <div className="field field-margin">
                        <input 
                            className="searchbar__input input-margin" 
                            type="text" 
                            placeholder="Search location"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                        />
                    </div>
                    <div className="searchbar__button">
                        <button className="ui button">
                        Find Cases
                        </button>
                    </div>
                </form>

                {loading ? renderedResults : 
                <Segment>
                    <Dimmer active inverted>
                        <Loader size='mini'>Waiting for location</Loader>
                    </Dimmer>

                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </Segment> }                
            </div>
        </div>
    )
}

export default Searchbar