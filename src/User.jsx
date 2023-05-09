import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const User = () => {
    const loadededUsers =useLoaderData();
    const [users,setUsers]=useState(loadededUsers);
    

        const handleDelete =_id=>{
            console.log("delete",_id);
            fetch(`http://localhost:5000/users/${_id}`,{
                method:'DELETE',
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.deletedCount>0){
                    alert('deleted successfully')
                    const remaining =users.filter(user=>user._id !==_id);
                    setUsers(remaining)
                }
            })
        }
    return (
        <div>
            {users.length}
            {
                users.map(user=><p  key={user._id}>
                    {user.name}:{user.email}:{user._id}
                    <Link to={`/update/${user._id}`}><button>update</button></Link>
                    <button onClick={()=>handleDelete(user._id)}>x</button></p>)
            }
            
        </div>
    );
};

export default User;