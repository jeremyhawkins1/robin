import React, { Component } from 'react'
import { Consumer } from '../context'
import Silo from './silos/Silo'

class Main extends Component {


  render() {
    return (
      <Consumer>
        {value => {
          const { silos, user } = value
          if (Object.keys(user).length > 0) {
              const siloList = []
              /*for (const k in silos) {
                console.log(typeof k, k, silos[k].groups)
                for (const i in silos[k].groups) {
                  console.log(typeof i, i, silos[k].groups[i])
                }
              }*/
              silos.forEach(silo => {
                
                
                /*console.log("silo",silo)
                console.log("silo.groups",silo.groups)
                console.log("silo.groups[0]",silo.groups[0])*/
                siloList.push(
                  <Silo 
                  key = {silo.id} 
                  id = {silo.id}
                  url = {`https://online-03.hccs.edu/toolkit/api/silos/${silo.id}`}
                  title = {silo.title}
                  groups = {silo.groups}
                  />
                )
              })
              return (
                <div className="container">
                  <div className="card-columns">
                    {siloList}
                  </div>
                </div>
              )
              } else {
                  this.props.history.push('/login')
                  
                }
        }}
      </Consumer>
      
    )
  }
}

export default Main
