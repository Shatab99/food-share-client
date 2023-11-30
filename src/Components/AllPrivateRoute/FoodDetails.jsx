import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci'
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../SecretLayouts/AuthProvider';
import { Helmet } from 'react-helmet-async';

const FoodDetails = () => {
    const { user } = useContext(AuthContext)
    const { _id, foodname, date, quantity, location, photo, message, email:postEmail, userPhoto, username } = useLoaderData()
    const [donation, setDonation] = useState('')

    const { mutate, isPending, refetch } = useMutation({
        mutationFn: (request) => {
            return axios.post('https://food-share-server.vercel.app/requestedfoods', request)
        }
    })

    const current = new Date();
    const reqdate = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const email = user?.email;
    const newuserPhoto = user?.photoURL;
    const newUserName = user?.displayName;
    const requestform = {fid:_id, foodname, date, quantity, location, photo, message, email, newuserPhoto, newUserName, reqdate, donation }
    
    
    const handleRequest = () => {
        console.log(requestform)

        
        mutate(requestform)
        Swal.fire({
            icon: 'success',
            title: 'Thanks For Your Promise To Donate !!!',
            text: 'Your Requested Food Successfully Added!!'
        });
    }


    return (
        <div className='max-w-4xl mx-auto my-12 grid grid-cols-3 gap-7 '>
            <Helmet><title>Details-{foodname}</title></Helmet>
            <img src={photo} alt="" className='mt-16 rounded-2xl col-span-2' />
            <div>
                <h1 className='text-lg font-semibold mb-4'>Posted by :</h1>
                <div className='border-2 rounded-2xl p-4 '>
                    <div className='flex flex-col items-center gap-3 '>
                        <img src={userPhoto} alt="" className='w-16 h-16 rounded-full' />
                        <div className='text-center'>
                            <p className='font-semibold'>{username}</p>
                            <p className='text-xs font-extralight'>{postEmail}</p>
                        </div>
                    </div>
                </div>
                <div className='border-2 rounded-2xl  p-4 mt-6'>
                    <h1 className='text-center font-semibold text-lg mb-1'><span className='text-orange-700'>Food</span> Details</h1><hr />
                    <div className='flex flex-col mt-2 gap-y-2'>
                        <p><span className='font-semibold'>Name :</span> {foodname}</p>
                        <p><span className='font-semibold'>Quantity :</span> {quantity}</p>
                        <p><span className='font-semibold'>Expires in :</span> {date}</p>
                        <div className='flex items-center gap-1'>
                            <CiLocationOn />
                            <p>{location}</p>
                        </div>
                        {/* <button onClick={handleRequest} className='btn bg-orange-700 text-white hover:text-black'>request for {foodname}</button> */}
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className='btn bg-orange-700 text-white hover:text-black' onClick={() => document.getElementById('my_modal_5').showModal()}>request for {foodname}</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <form className="modal-box flex flex-col items-center ">
                                <h3 className="font-bold text-lg text-center my-6">How Much You want to donate!!</h3>
                                <input type="number" name='donation' onChange={(e) => setDonation(e.target.value)} placeholder="$ Donation Amount ..." className="input input-bordered input-warning w-full max-w-xs" required/>
                                <div className="modal-action">
                                    <form method="dialog" className='flex gap-3 items-center '>
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn bg-green-700 text-white hover:text-black" onClick={handleRequest} >Donate !</button>
                                        <button className="btn bg-red-700 text-white hover:text-black">Cancel</button>
                                    </form>
                                </div>
                            </form>
                        </dialog>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default FoodDetails;