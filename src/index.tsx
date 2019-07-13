import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css'
// import App from './App';
import Admin from './components/Admin'
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import articleStore from './stores/articleStore'
import Layout from 'components/Layout/Index';
import App from 'App';

const stores = {
  articleStore
}

ReactDOM.render((
  <Provider {...stores}>
      <Router>
        <Layout>
          {/* <Route exact path='/' render={()=>{
            return <Redirect to='/admin/'></Redirect>
          }}/> */}
          <Route path='/admin/' component={Admin}/>
          
          <Route exact path='/' component={App}/>
        </Layout>
      </Router> 
    </Provider>
),
   document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
