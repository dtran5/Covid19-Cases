import React from 'react';
import Searchbar from './Searchbar';
import '../assets/App.scss';
import '../assets/Searchbar.scss';


const App = () => {
    return (
        <div className="app">
            <div className="ui container">
                <Searchbar />
                
            </div>
            
        </div>  
    )
}

export default App

//learned to connect with api 
//get requests
//passing props
//using state, functional components, hooks
//semantic ui
//clear timeout function
//using axios
//could still use a refactor possibly
//fix loading spinner to run only when actually loading
//event handlers/forms
//hide api key