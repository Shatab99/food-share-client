import React, { useContext } from 'react';
import { AuthContext } from '../../SecretLayouts/AuthProvider';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AddFoods = () => {
    const { user } = useContext(AuthContext)

    const { mutate, isPending, refetch, isSuccess } = useMutation({
        mutationFn: (foodForm) => {
            return axios.post('https://food-share-server.vercel.app/availablefoods', foodForm)
        }
    })

    const handleOrder = e => {
        e.preventDefault();
        const form = e.target;
        const foodname = form.foodname.value;
        const date = form.date.value;
        const quantity = form.quantity.value;
        const location = form.location.value;
        const photo = form.photo.value;
        const message = form.message.value;
        const email = user?.email;
        const userPhoto = user?.photoURL;
        const username = user?.displayName;
        const foodForm = { foodname, date, quantity, location, photo, message, email, userPhoto, username }
        console.log(foodForm)
        mutate(foodForm)
        Swal.fire({
            icon: 'success',
            title: 'Congo!!!',
            text: 'Your Order Successfully Placed!!'
        });
        form.reset()


    }

    return (
        <div className='max-w-2xl mx-auto my-12 shadow-2xl p-4 rounded-2xl'>
            <Helmet><title>Add Foods </title></Helmet>
            <h1 className='text-center font-bold text-3xl my-8'>Add Your Food Here</h1>
            <form onSubmit={handleOrder} className='flex flex-col '>
                <div className='flex items-center justify-center gap-4  mb-8 '>
                    <input type="text" name='foodname' placeholder="Food name" className="input input-bordered w-full max-w-xs" required/>
                    <input type="text" name='photo' placeholder="Photo URL " className="input input-bordered w-full max-w-xs" required/>
                </div>
                <div className='flex items-center justify-center  gap-4 mb-8'>
                    <input type="number" name='quantity' placeholder="Food Quantity" className="input input-bordered w-full max-w-xs" required/>
                    <input type="text" name='location' placeholder="Pick Up Location" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className='mb-8 w-full flex justify-center gap-x-5 items-center'>
                    <h1 className='font-semibold'>Enter Expire Date :</h1>
                    <input type="date" name='date' placeholder="Photo URL" className="input input-bordered  " required/>
                </div>
                <textarea name='message' placeholder="Short Note" className="textarea textarea-bordered textarea-lg w-full max-w-2xl mb-8 mx-auto" ></textarea>
                {/* {
                    isPending ? <input type="submit" value="Order Placing ...." className="btn w-4/5 mx-auto  text-white hover:text-black border-none" disabled /> : 
                } */}
                <input type="submit" value="Add Food" className="btn btn-wide mx-auto bg-[#547532] text-white hover:text-black border-none" />
            </form>
        </div>
    );
};

export default AddFoods;