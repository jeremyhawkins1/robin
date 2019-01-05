import React, { Component } from 'react'
import axios from 'axios'

const Context = React.createContext()

const reducer = (state, action) => {
  console.log("Running Action: "+action.type,action)
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

export default class Provider extends Component {
 state = {
   dispatch: action => { this.setState(state => reducer(state, action))},
   user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
   silos: []
 }

  componentDidMount() {
    const api = "https://online-03.hccs.edu/toolkit/api"
    const siloStore = []
    
    console.log("Getting Data")
    axios.get(`${api}/silos`)
    .then(response => {
      if (response.status === 200){
        let results = response.data
        results.data.forEach(silo => {
          siloStore[silo._id] = {
            id: silo._id,
            title: silo.title,
            groups: []
          }
          console.log("Gettin Groups for Silo "+silo._id)
          axios.get(`${api}/silos/${silo._id}/groups`)
          .then(response => {
            if (response.status === 200) {
              console.log("Recieved Groups for Silo "+silo._id)
              let results = response.data
              results.data.forEach(group => {
                siloStore[silo._id]['groups'][group._id] = {
                  id: group._id,
                  title: group.title,
                  commands: []
                }
                console.log("Getting Commands for Group "+group._id)
                axios.get(`${api}/silos/${silo._id}/groups/${group._id}/commands`)
                .then(response => {
                  if (response.status === 200){
                    let results = response.data
                    results.data.forEach(command => {
                      siloStore[silo._id]['groups'][group._id]['commands'][command._id] = {
                        id: command._id,
                        title: command.title,
                        details: command.details
                      }
                    })
                  } else {
                    console.log("No Commands for Group "+group._id)
                  }
                  console.log("All Data Collection Should be Complete...")
                  console.log("Adding Silos to State", siloStore)
                  this.setState({ silos: siloStore })
                })
              })
            } else {
              console.log("No Groups for Silo "+silo._id)
            }
          })
        }) 
      } else {
        console.log("No Data Recieved")
      }
    })

  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer
