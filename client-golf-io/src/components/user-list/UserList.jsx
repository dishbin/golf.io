import React, { useEffect, useState } from 'react';
import UserItem from '../user-item/UserItem';

function UserList({ users, socket }) {

    useEffect(() => {
        console.log(users);
    }, [socket]);

    return (
        <div className='UserList'>
            {(users) &&
                Object.values(users).map(user => {
                    return <UserItem key={user.id} user={user} />
                })
            }
        </div>
    );
}

export default UserList;