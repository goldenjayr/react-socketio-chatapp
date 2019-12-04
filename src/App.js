import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './components/Join/'
import Chat from './components/Chat/'
import Uploads from './components/Uploads/'

const routes = [
  {
    props: {
      key: 'join',
      path: '/',
      exact: true,
      component: Join
    }
  },
  {
    props: {
      key: 'chat',
      path: '/chat',
      component: Chat
    }
  },
  {
    props: {
      key: 'uploads',
      path: '/uploads',
      component: Uploads
    }
  }
]

function App() {
  return (
   <Router>
     {routes.map(route => {
       return (
         <Route {...route.props} />
       )
     })}
   </Router>
  );
}

export default App;
