import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css'
import App from './App';
import { Provider } from 'react-redux';
import Admin from './components/Admin'
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import reducers from 'reducers';

const store = createStore(reducers)
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Route exact path='/' component= {App}/>
      <Route path='/admin/' component={Admin}/>
    </Router> 
  </Provider>
),
   document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
