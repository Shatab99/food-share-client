import Lottie from 'lottie-react';
import { FaCheck } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLoaderData } from "react-router-dom";
import loading from '../LoadingAnimations/no-data-animation.json'
import Swal from 'sweetalert2';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';


const ManageFoodDetails = () => {

    const foodloader = useLoaderData()
    const [foods, setFoods] = useState(foodloader)


    const handleConfirm = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0A5A00",
            cancelButtonColor: "#d33",
            confirmButtonText: `Confirm To Deliver `
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://food-share-server.vercel.app/requestedfoods/${_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: 'confirm' })
                })
                    .then(res => res.json())
                    .then(data => {
                        Swal.fire({
                            title: "Done ! Deliver the product to customer",
                            text: "Your Donation should Reach to Poor Peoples ",
                            icon: "success"
                        });

                    })
            }
        });
    }









    return (
        <div className="max-w-xl mx-auto my-8">
            <Helmet><title>Manage Requests </title></Helmet>
            <h1 className="text-2xl text-center ">User's Requests </h1>
            <div className='max-w-xl mx-auto'>
                <InfiniteScroll dataLength={foodloader.length} next={foodloader} height={400}>
                    {
                        foods.length === 0 ?
                            <div className='max-w-sm mx-auto'><Lottie animationData={loading}></Lottie>
                            </div>
                            :
                            foods.map(food => <>
                                <div className="flex items-center justify-center gap-x-5 py-4 rounded-2xl  my-4 border-2">
                                    <img src={food.newuserPhoto} alt="" className="w-16 h-16 rounded-full" />
                                    <div className='flex flex-col gap-y-1'>
                                        <p>Name : {food.newUserName}</p>
                                        <p>Email : {food.email}</p>
                                        <p>Requested Date : {food.reqdate}</p>
                                        <p>Donation Pending : ${food.donation}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        {
                                            food.status === 'confirm' ? <button className=' p-4 rounded-2xl bg-green-700 text-white'>Delivered</button> : <button onClick={() => handleConfirm(food._id)} className='btn bg-orange-700 text-white hover:text-black'><FaCheck /></button>
                                        }

                                    </div>
                                </div>
                            </>)
                    }
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default ManageFoodDetails;