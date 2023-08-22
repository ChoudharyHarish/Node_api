import React, { useEffect, useState } from "react";
import axios from 'axios';
import moment from "moment";

import { useParams } from "react-router-dom";


const Order = () => {

    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const [order, setOrder] = useState(null);


    useEffect(() => {
        const getOrder = async () => {
            const accessToken = localStorage.getItem("profile");
            const res = await axios.get(`https://node-api17.vercel.app/api/v1/user/get-order/${id}`, { headers: { 'Authorization': `Bearer ${accessToken}` } });
            setOrder(res?.data);
        }
        getOrder();
    }, [id]);

    return (
        <div className="py-32 lg:py-28 px-16 md:px-12  2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col ">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  inline-block text-gray-800">
                    Thank You For your order  <p className="text-sm inline-block">Order ID : {order?._id}</p>
                </h1>
                <p className="text-base font-medium leading-6 text-gray-600">
                    {moment(order?.createdAt).format('Do MMMM YYYY [at] h:mm A')}
                </p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Summary
                    </h3>
                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        <div className="flex justify-between  w-full">
                            <p className="text-base leading-4 text-gray-800">Subtotal</p>
                            <p className="text-base leading-4 text-gray-600">
                                ₹{order?.subTotal}
                            </p>
                        </div>

                        <div className="flex justify-between items-center w-full">
                            <p className="text-base leading-4 text-gray-800">Shipping</p>
                            <p className="text-base leading-4 text-gray-600">
                                ₹40
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-base font-semibold leading-4 text-gray-800">
                            Total
                        </p>
                        <p className="text-base font-semibold leading-4 text-gray-600">
                            ₹{order?.subTotal + 40}
                        </p>
                    </div>
                </div>
                <div className="bg-gray-50 w-full  xl:w-1/3 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        User Details
                    </h3>
                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                        <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                            <img
                                src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                                alt="avatar"
                            />
                            <p className="text-base font-semibold leading-4 text-left text-gray-800">
                                {user?.name}
                            </p>
                        </div>

                        <div className="flex items-center justify-center xl:justify-start  space-x-4 py-4 border-b border-gray-200 w-full">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                                    stroke="#1F2937"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3 7L12 13L21 7"
                                    stroke="#1F2937"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className="cursor-pointer my-auto text-sm leading-5 text-gray-800">
                                {order?.phoneNumber}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;