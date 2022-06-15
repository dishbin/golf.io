import React from 'react';

function UserItem({ user }) {
    return (
        <div className='UserItem'>
            {user.username}
        </div>
    );
}

export default UserItem;