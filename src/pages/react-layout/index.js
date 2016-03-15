import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import BacklogComponent from 'backlog'
let favicon = require('./favicon.ico')
document.querySelector('[rel="shortcut icon"]').href = favicon
// expose global fetch polyfil
require('whatwg-fetch')

require('./components/bootstap-customized')

import Header from './components/header'

class AppComponent extends React.Component {
  render () {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

AppComponent.propTypes = {
  children: React.PropTypes.any.isRequired
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={AppComponent}>
      <IndexRoute component={BacklogComponent}/>
      <Route path='/backlog' component={BacklogComponent}/>
    </Route>
  </Router>
  ), document.getElementById('app'))
