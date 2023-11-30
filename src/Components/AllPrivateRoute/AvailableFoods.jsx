import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import loading from '../LoadingAnimations/loader-available-foods.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../../SecretLayouts/AuthProvider';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CiLocationOn } from 'react-icons/ci'
import { Link } from 'react-router-dom';

const AvailableFoods = () => {
    const { user } = useContext(AuthContext)
    const [search, setSearch] = useState('')
    const { data: foods, isPending, refetch } = useQuery({
        queryKey: ['foods'],
        queryFn: async () => {
            const res = await fetch('https://food-share-server.vercel.app/availablefoods')
            return res.json()
        }
    })

    if (isPending) {
        return <div className='max-w-lg mx-auto'><Lottie animationData={loading} height={100} width={100} /> </div>
    }

    return (
        <>
            <Helmet><title>Available Foods</title></Helmet>
            <div className='flex items-center justify-between max-w-4xl mx-auto'>
                <h1 className='text-center font-bold text-3xl my-6 '>All Available Foods ({foods.length})</h1>
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" onChange={(e)=>setSearch(e.target.value.toLowerCase())} placeholder="Search…" className="input input-bordered" />
                        <button className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto mb-12 border-dashed border-2 rounded-s-3xl'>
                <InfiniteScroll dataLength={foods.length} next={foods} height={500} >
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4  my-4 lg:px-2 px-3'>
                        { 
                            foods.filter(food=>{
                                return search.toLowerCase() ===''? food: food.foodname.toLowerCase().includes(search)
                            })?.map(food => <>
                                <div className="card  bg-base-100 shadow-xl">
                                    <figure><img src={food?.photo} alt="Shoes" className='w-72 h-56' /></figure>
                                    <div className="card-body">
                                        <div className='flex items-center gap-3'>
                                            <img src={food?.userPhoto} alt="" className='w-12 h-12 rounded-full ' />
                                            <div>
                                                <h1 className='font-semibold'>{food?.username}</h1>
                                                <h1 className='font-extralight text-sm'>{food?.email}</h1>
                                            </div>
                                        </div>
                                        <div className='text-sm space-y-1'>
                                            <p> <span className='font-semibold'>Food Name</span> : {food.foodname}</p>
                                            <p><span className='font-semibold'>Quantity</span>: {food.quantity}</p>
                                            <p><span className='font-semibold'>Expires In</span>:{food.date}</p>
                                            <div className='flex items-center gap-2'>
                                                <CiLocationOn />
                                                <p>{food.location}</p>
                                            </div>
                                        </div>

                                        <div className="card-actions justify-center">
                                            <Link to={`/availablefoods/${food._id}`} className='btn btn-wide bg-[#9EC535] text-white hover:text-black' >Details</Link>
                                        </div>
                                    </div>
                                </div>
                            </>)
                        }
                    </div>
                </InfiniteScroll>
            </div>
        </>
    );
};

export default AvailableFoods;