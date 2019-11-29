import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './components/Join/'
import Chat from './components/Chat/'

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
