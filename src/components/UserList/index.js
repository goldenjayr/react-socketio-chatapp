import React from 'react'

import './UserList.scss'

const UserList = ({roomData}) => {
    return (
        <div className="userlist">
            <div><h4>Online Users</h4></div>
            {roomData.users && roomData.users.map(user => {
                return (
                    <div className="userlist-user" key={user.id}>
                        <img className="userlist-profilepic" src={`https://robohash.org/${user.name}${user.room}?set=set5`} alt='profile' />
                        {user.name}
                    </div>
                )
            })}
        </div>
    )
}

export default UserList