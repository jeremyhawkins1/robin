import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './App.css'
import Provider from './context'
import Header from './layout/Header'
import Main from './components/Main'
import Login from './components/users/Login'

import * as serviceWorker from './serviceWorker'

const App = props => {
  return (
    <Provider>
      <Router>
        <div className="container">
          <Header branding="ToolKit Admin" />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
