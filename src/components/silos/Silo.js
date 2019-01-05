import React from 'react'
import Group from './Group'


const Silo = (props) => {
    const groupList = []
    
    
    
    
    
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <div className="card-text">
                    {groupList}
                </div>
            </div>
        </div>
    )
}
 
export default Silo;

/*
for (let group of props.groups) {
        console.log("This Group is ",group)
        groupList.push(
            <Group
            key = {group.id}
            id = {group.id}
            url = {`${props.url}/groups`}
            title = {group.title}
            commands = {group.commands} />
        )
    }
    */