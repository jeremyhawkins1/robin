import React, { Component } from 'react'

class Group extends Component {
    render() {
        const groupList = []
        
        this.props.groups.forEach(group => {
            console.log(group)
            groupList.push((
                <li className="list-group-item">group.title</li>
            ))
        })
        return (
            <ul className="list-group">
                {groupList}
            </ul>
        )        
    }
}
 
export default Group;