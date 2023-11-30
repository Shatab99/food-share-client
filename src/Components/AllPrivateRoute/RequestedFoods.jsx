import React, { useContext } from 'react';
import { AuthContext } from '../../SecretLayouts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import loading from '../LoadingAnimations/loader-available-foods.json'
import InfiniteScroll from 'react-infinite-scroll-component';
import empty from '../LoadingAnimations/empty-Animation.json'
import { CiLocationOn } from 'react-icons/ci'
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import delivery from '../LoadingAnimations/Delivery-animation.json'

const RequestedFoods = () => {

    const { user } = useContext(AuthContext)

    const url = `https://food-share-server.vercel.app/requestedfoods?email=${user.email}`

    const { data: foods, isPending, refetch } = useQuery({
        queryKey: ['foods'],
        queryFn: async () => {
            const res = await fetch(url, {credentials : 'include'})
            return res.json()
        }
    })


    



    const handleDelete = (_id) => {
        console.log(_id)

        Swal.fire({
            title: "Are you sure?",
            text: "Your request will be canceled !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I am sure!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://food-share-server.vercel.app/requestedfoods/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("deleted", data)
                        Swal.fire({
                            title: "Canceled !",
                            text: "Your Requested Food Successfully Canceled .",
                            icon: "success"
                        });
                        refetch();
                    })
            }
        });
    }


    

    console.log(foods)
    if (isPending) {
        return <div className='max-w-lg mx-auto'><Lottie animationData={loading} height={100} width={100} /> </div>
    }




    return (
        <div className='my-8'>
        <Helmet><title>Food Request</title></Helmet>
            <h1 className='text-3xl font-semibold text-center'>My Food Requests</h1>
            <div className='my-4 border-2 rounded-2xl p-12 max-w-4xl mx-auto'>
                <InfiniteScroll dataLength={foods.length} next={foods} height={500}>
                    {
                        foods.length === 0 ? <div className='w-1/2 mx-auto'>
                            <Lottie animationData={empty} ></Lottie>
                            <h1 className='text-center'>empty! No Request Found</h1>
                        </div> :
                            foods.map(food => <>
                                <div className='grid grid-cols-3 p-4 shadow-xl rounded-2xl border-2 gap-4 mb-4'>
                                    <div className='flex flex-col-reverse gap-y-3'>
                                        {
                                            food.status === 'confirm' ?
                                                <p className='bg-green-400 p-2 text-white font-semibold rounded-2xl text-center '>Delivered</p>
                                                : <p className='bg-orange-400 p-2 text-white font-semibold rounded-2xl text-center '>Pending for ${food.donation >0 ? food.donation : 0} Donation</p>
                                        }
                                        <img src={food.photo} alt="" />
                                    </div>
                                    <div className='flex flex-col justify-center gap-y-1 '>
                                        <p><span className='font-semibold'>Name :</span> {food.foodname}</p>
                                        <p><span className='font-semibold'>Quantity :</span> {food.quantity}</p>
                                        <p><span className='font-semibold'>Expires in :</span> {food.date}</p>
                                        <div className='flex items-center gap-1'>
                                            <CiLocationOn />
                                            <p>{food.location}</p>
                                        </div>
                                        <p><span className='font-semibold'>Requested in :</span> {food.reqdate}</p>
                                    </div>
                                    {
                                        food.status === 'confirm' ?
                                            <div className='flex flex-col items-center justify-center gap-y-3'>
                                               
                                            <div>
                                                <Lottie  animationData={delivery}></Lottie>
                                            </div>
                                            <p>Your  Delivery Is On Way</p>
                                            </div>
                                            :
                                            <div className='flex flex-col items-center justify-center gap-y-5'>
                                                {/* <button className='btn bg-green-700 text-white hover:text-black' onClick={() => handleConfirm(food._id, food.donation)}>Confirm</button> */}
                                                <button onClick={() => handleDelete(food._id)} className='btn bg-red-700 text-white hover:text-black'>Cancel</button>
                                            </div>
                                    }
                                </div>
                            </>)
                    }
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default RequestedFoods;