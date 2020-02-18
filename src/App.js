import React from 'react';
import './assets/scss/style.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route
 } from 'react-router-dom';
 import Header from './components/Header';
 import Footer from './components/Footer';
 import Home from './views/Home';
 import Single from './views/Single';

function App() {
  return (
    <div className="App">
     <Router>
        <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:pokemon" component={Single} />
        </Switch>
        <Footer />
    </Router>
    </div>
  );
}

export default App;
