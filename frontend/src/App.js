import React, { useContext } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import Accueil from './components/Accueil'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Shower from './components/showerComponent/Shower'
import MapTdpHeader from './components/MapTdpTitle';
import Displayer from './components/repCreator/Displayer';
import { AuthProvider, AuthContext } from './components/AuthContext';
import { ThemeProvider } from './components/ThemeContext';
// import AuthPage from './components/AuthPage';

function AppContent() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{
        minHeight:'100vh', 
        display:'flex', 
        alignItems:'center', 
        justifyContent:'center',
        background:'var(--bg)',
      }}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Chargement...</span>
        </div>
      </div>
    );
  }

  // if (!user) {
  //   return <AuthPage />;
  // }

  return (
    <div> 
      <Provider store={Store}>
        <MapTdpHeader/>
        <Router>
          <Switch>
            <Route exact path="/">
              <Accueil/>  
            </Route>    
            <Route exact path="/Shower">
              <Shower/>  
            </Route>  
            <Route exact path="/Displayer">
              <Displayer/>  
            </Route> 
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

class App extends React.Component {
  render(){
    return (
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    );    
  }
}

export default App;
