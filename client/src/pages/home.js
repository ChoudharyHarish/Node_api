import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Avatar } from "@mui/material";


export default function Auth({setShowModal}) {
  const [user,setUser] = useState(null);

    useEffect(()=>{
       setUser(JSON.parse(localStorage.getItem("user")))
    },[]);
 


return (

<div className='p-8 h-screen gap-4  md:w-1/2 mx-auto' style = {{transition:"0.4s all ease-in-out"}}>
<div className='lg:flex justify-between items-center'>
    <h4 className="text-4xl mb-4 lg:mb-0">Account Details</h4>
    <Link to ='/auth' className='text-decoration-none text-white bg-[#4681f4] p-2 cursor-pointer'>Auth Screen </Link>

</div>

<div className='flex flex-col justify-between h-full mt-4'>

    {
      user ? 
    <>  
        <div className="flex flex-col gap-2">
         <p className="cursor-pointer text-lg flex items-center justify-between">
         {user?.imageUrl ? <Avatar alt="Remy Sharp" src={user.imageUrl} />  :
          <Avatar> {user?.name?.slice(0,1)} </Avatar>
          }
         Welcome {user?.name} 👋
         </p>
         <Link to='/orders'>
         <button className="cursor-pointer text-center text-md text-decoration-none w-full shop-now p-2">View my orders</button>
         </Link>

        </div>
    
     </>
      :
      <>
      <div>
      <p className="cursor-pointer">To View your orders please Login</p>
      </div>
      <Link to='/auth' className="cursor-pointer text-center text-md text-decoration-none w-1/2 shop-now p-2 text-white">Login</Link>
      </>
    } 

    

</div>
</div>
)

}





