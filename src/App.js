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
 import Find from './views/Find';

function App() {
  return (
    <div className="App">
     <Router>
        <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/find" component={Find} />
            <Route exact path="/:name" component={Single} />
        </Switch>
        <Footer />
    </Router>
    </div>
  );
}

export default App;
