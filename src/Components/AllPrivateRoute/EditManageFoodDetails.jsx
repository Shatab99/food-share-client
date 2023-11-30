import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditManageFoodDetails = () => {

    const { _id, foodname, photo, quantity, location, date, message } = useLoaderData()
    console.log(foodname)



    const handleEdit = (e) => {
        e.preventDefault();
        const form = e.target;
        const foodname = form.foodname.value;
        const date = form.date.value;
        const quantity = form.quantity.value;
        const location = form.location.value;
        const photo = form.photo.value;
        const message = form.message.value;
        const foodForm = { foodname, photo, quantity, location, date, message }
        console.log(foodForm)
        axios.put(`https://food-share-server.vercel.app/managefood/${_id}`, foodForm)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Congo!!!',
                    text: 'Your Order Successfully Placed!!'
                });

            })
        form.reset()
    }
    return (
        <div className='max-w-2xl mx-auto my-12 shadow-2xl p-4 rounded-2xl'>
            <Helmet><title>Edit Foods </title></Helmet>
            <h1 className='text-center font-bold text-3xl my-8'>Update Your Food Here</h1>
            <form onSubmit={handleEdit} className='flex flex-col '>
                <div className='flex items-center justify-center gap-4  mb-8 '>
                    <input type="text" name='foodname' placeholder="Food name" className="input input-bordered w-full max-w-xs" defaultValue={foodname} />
                    <input type="text" name='photo' placeholder="Photo URL " className="input input-bordered w-full max-w-xs" defaultValue={photo} />
                </div>
                <div className='flex items-center justify-center  gap-4 mb-8'>
                    <input type="number" name='quantity' placeholder="Food Quantity" className="input input-bordered w-full max-w-xs" defaultValue={quantity} />
                    <input type="text" name='location' placeholder="Pick Up Location" className="input input-bordered w-full max-w-xs" defaultValue={location} />
                </div>
                <div className='mb-8 w-full flex justify-center gap-x-5 items-center'>
                    <h1 className='font-semibold' >Enter Expire Date :</h1>
                    <input type="date" name='date' placeholder="" className="input input-bordered  " defaultValue={date} />
                </div>
                <textarea name='message' placeholder="Short Note" className="textarea textarea-bordered textarea-lg w-full max-w-2xl mb-8 mx-auto" defaultValue={message}></textarea>
                {/* {
                    isPending ? <input type="submit" value="Order Placing ...." className="btn w-4/5 mx-auto  text-white hover:text-black border-none" disabled /> : 
                } */}
                <input type="submit" value="Update Food" className="btn btn-wide mx-auto bg-orange-600 text-white hover:text-black border-none" />
            </form>
        </div>
    );
};

export default EditManageFoodDetails;