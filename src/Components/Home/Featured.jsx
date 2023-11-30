import { useQuery } from '@tanstack/react-query';
import { CiLocationOn } from 'react-icons/ci'
import { Link } from 'react-router-dom';
import loading from '../LoadingAnimations/loader-available-foods.json'
import Lottie from 'lottie-react';

const Featured = () => {

    const { data: foods, isPending, refetch } = useQuery({
        queryKey: ['features'],
        queryFn: async () => {
            const res = await fetch('https://food-share-server.vercel.app/featuresfoods')
            return res.json()
        }
    })

    
    if(isPending){
        return <div className='max-w-lg mx-auto'><Lottie animationData={loading} height={100} width={100} /> </div>
    }

    return (
        <>
            <div className='max-w-5xl mx-auto my-12'>
                <h1 className='text-center font-semibold text-4xl divider'>Featured Foods</h1>
                <div className='grid grid-cols-1 gap-4 p-4 lg:grid-cols-3 '>
                    {
                        foods?.map(food => <>
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
                                        <Link to={`/availablefoods/${food._id}`} className='btn btn-wide bg-[#9EC535] text-white hover:text-black'>Details</Link>
                                    </div>
                                </div>
                            </div>
                        </>)
                    }
                </div>
                <div className='flex justify-center mt-5'>
                    <Link to={'/availablefoods'} className='btn btn-wide bg-orange-500 text-white hover:text-black'>Show More</Link>
                </div>
            </div>
        </>
    );
};

export default Featured;