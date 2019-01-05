import React, { Component } from 'react'
import { Consumer } from '../../context'
import axios from 'axios'


class Login extends Component {
  state = {
    user: '',
    password: ''
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  loginSubmit = (dispatch, e) => {
    console.log("event: ", e)
    console.log("dispatch: ",dispatch)
    e.preventDefault()
    if (this.state.username !=='' && this.state.password !== '') {
      console.log("Submit Login")
      axios.post('https://online-03.hccs.edu/toolkit/api/login',this.state)
      .then(response => {
        console.log("User "+response.data.display+" has successfuly logged in")
        localStorage.setItem('user', JSON.stringify(response.data))
        dispatch({
          type: 'USER_LOGIN',
          payload: response.data
        })
        this.props.history.push('/')
      })
      .catch(err => {
        console.log("User Login Failed: ",err.response)
      })
    } else {
      console.log("Username or Password is empty")
    }
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          return (
            <div className="container py-5">
              <div className="row">
                  <div className="col-md-12">
                      <h2 className="text-center text-white mb-4">Tutoring Admin Login</h2>
                      <div className="row">
                          <div className="col-md-6 mx-auto">

                              
                              <div className="card rounded-0">
                                  <div className="card-header">
                                      <h3 className="mb-0">Login</h3>
                                  </div>
                                  <div className="card-body">
                                      <form className="form" autoComplete="off" id="formLogin" onSubmit={this.loginSubmit.bind(this,dispatch)}>
                                          <div className="form-group">
                                              <label htmlFor="username">Username</label>
                                              <input 
                                              type="text" 
                                              className="form-control form-control-lg rounded-0" 
                                              value = {this.state.user}
                                              name="user" 
                                              id="username" 
                                              required="" 
                                              onChange={this.onChange} />
                                              <div className="invalid-feedback">Enter your HCC Username</div>
                                          </div>
                                          <div className="form-group">
                                              <label>Password</label>
                                              <input 
                                              type="password" 
                                              className="form-control form-control-lg rounded-0" 
                                              value = {this.state.password}
                                              name="password"
                                              id="password" 
                                              required="" 
                                              autoComplete="new-password" 
                                              onChange={this.onChange} />
                                              <div className="invalid-feedback">Enter your password too!</div>
                                          </div>
                                          
                                          <button 
                                          type="submit" 
                                          className="btn btn-success btn-lg float-right" 
                                          id="btnLogin">
                                            Login
                                          </button>
                                      </form>
                                  </div>
                                  
                              </div>
                              

                          </div>

                        </div>


                      </div>
                  </div>
                  

              </div>
          )
        }}
            </Consumer>
    )
  }
}

export default Login
