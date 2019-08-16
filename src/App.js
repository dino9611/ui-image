import React from 'react';
import ManagePosts from './components/managePost'
import './App.css';
import {Route} from 'react-router-dom'
import Header from './components/header.jsx'

import Home from './components/home.jsx'
import Verified from './components/verified'
import WaitingVerification from './components/waitingverified.jsx'
import Register from './components/register.jsx'
class App extends React.Component {
  state = {  }
  render() { 
    return (
      <div>
        <Header navBrand ={`instagrin`}/>

          <Route exact path='/' component={Home}/>
          <Route  path='/register' component={Register}/>
          <Route  path='/waitingverification' component={WaitingVerification}/>
          <Route  path='/verified' component={Verified}/>
          <Route  path='/managepost' component={ManagePosts}/>

      </div>
      );
  }
}
 
export default App;

