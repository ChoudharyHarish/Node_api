import React,{useEffect, useState} from 'react';
import axios from "axios";
import  StickyHeadTable from "../components/Table";
import { Link } from 'react-router-dom';


const Orders = () => {

  const [orders,setOrders] = useState([]);



  useEffect(() => {
        const getOrders = async() => {
          try{
            const accessToken = localStorage.getItem("profile");
            const res = await axios.get('http://localhost:5000/api/v1/user/get-orders',{headers : {'Authorization' : `Bearer ${accessToken}`}})
            console.log(res?.data);
            setOrders(res?.data);
          }
          catch(err){
            console.log(err);
            alert(err?.response.data);
          }
           
        }
        getOrders();
  },[]);



  return (
    <div className='py-32 flex flex-col  px-16  lg:py-20 '>
    <div className='md:flex justify-center items-center  mb-4'>
        <h1>Your Orders</h1>
        <Link to ='/home' className='text-decoration-none text-white bg-[#4681f4] p-2 cursor-pointer md:ml-8 '> Back to Home</Link>
    </div>
        {orders.length > 0 &&  <StickyHeadTable orders = {orders}/>}
    </div>
  )
}

export default Orders