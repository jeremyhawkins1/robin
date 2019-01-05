import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Consumer } from '../context'

class Header extends Component {
  render() {
    const { branding } = this.props
    return (
      <Consumer>
        { value => {
          const { user } = value
          return (
            <nav className="navbar navbar-light bg-primary">
              <span className="navbar-brand"><i className="fas fa-cubes fas fa-3x"/> {branding}</span>

              <ul className="navbar-nav">
                {
                  Object.keys(user).length === 0 ? 
                      <li className="nav-item">
                        <Link to="/login" className="nav-link">User Login</Link>
                      </li>
                      :
                      <React.Fragment>
                        <li className="nav-item">
                          <Link to="/users" className="nav-link">Users</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/adduser" className="nav-link">New User</Link>
                        </li>
                      </React.Fragment>
                }                
              </ul>
            </nav>
          )
        }}
      </Consumer>
    )
  }
}

export default Header
