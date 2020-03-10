import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
 import Game from './views/Game';
 import Ranking from './views/Ranking';
 import Compare from './views/Compare';

function App() {
  return (
    <div className="App">
     <Router>
        <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/pokemon/:name" component={Single} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/compare/:pokeCompare" component={Compare} />
            <Route exact path="/ranking" component={Ranking} />
        </Switch>
        <Footer />
    </Router>
    </div>
  );
}

export default App;
