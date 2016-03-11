import React from 'react'
let robomongoImage = require('./robomongo-128x128.png')
require('./style.less')

class HeaderComponent extends React.Component {
  render () {
    return (
    <div className='robo-header'>
        <nav className='navbar navbar-default navbar-static-top'>
          <div className='container'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='true' aria-controls='navbar'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
              <a className='navbar-brand' href='/'>
                <img src={robomongoImage} className='robo-header__logo'></img>
                Robomongo
              </a>
            </div>
            <div id='navbar' className='collapse navbar-collapse'>
              <ul className='nav navbar-nav navbar-right'>
                <li><a href='/download'>Download</a></li>
                <li><a href='/account'>Account</a></li>
                <li className='active'><a href='/backlog'>Backlog</a></li>
                <li><a href='/account/subscription'>Subscription</a></li>
                <li><a href='/signout'>Sign out</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default HeaderComponent
