import React, { useEffect, useState } from 'react';
import UserItem from '../UserItem.jsx/UserItem';

function UserList({ users }) {

    const [usersInLobby, setUsersInLobby] = useState(null);

    useEffect(() => {
        console.log(users);
    })

    return (
        <div className='UserList'>
            {/* {(users) &&
                users.forEach(user => {
                    return <UserItem key={user.username} user={user} />
                })
            } */}
        </div>
    );
}

export default UserList;