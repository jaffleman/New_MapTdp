import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import Accueil from './components/Accueil'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Shower from './components/showerComponent/Shower'
import MapTdpHeader from './components/MapTdpTitle';
//import CreatRep from './components/CreatRep';
import Displayer from './components/repCreator/Displayer';


class App extends React.Component {
  goToRecherche = ()=>{
    return <Link to="/Recherche"/>
  }
  render(){
    return (
      <div> 
        <Provider store = {Store}>
          <MapTdpHeader/>
          <Router>
            <Switch>
              <Route exact path="/">
                <Accueil/>  
              </Route>    
              <Route exact path="/Shower">
                <Shower/>  
              </Route>  
              {/*<Route exact path="/CreatRep">
                <CreatRep/>  
    </Route> */}
              <Route exact path="/Displayer">
                <Displayer/>  
              </Route> 
            </Switch>
          </Router>
        </Provider>
      </div>
    );    
  }
}

export default App;
