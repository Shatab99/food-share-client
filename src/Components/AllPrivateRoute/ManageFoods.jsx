import { useContext } from "react";
import { AuthContext } from "../../SecretLayouts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdOutlineManageAccounts } from 'react-icons/md'
import InfiniteScroll from "react-infinite-scroll-component";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import emptyload from '../LoadingAnimations/empty-table-animation.json'
import { Helmet } from "react-helmet-async";


const ManageFoods = () => {

    const { user } = useContext(AuthContext)
    const url = `https://food-share-server.vercel.app/managefood?email=${user.email}`;

    const { data: foods, isPending, refetch } = useQuery({
        queryKey: ['foods'],
        queryFn: async () => {
            const res = await fetch(url)
            return res.json()
        }
    })

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://food-share-server.vercel.app/availablefoods/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    })
            }
        });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const _id = form.id.value;
        const foodname = form.foodname.value;
        const photo = form.photo.value;
        const quantity = form.quantity.value;
        const location = form.location.value;
        const date = form.date.value;
        const message = form.message.value;

        const upadateForm = { foodname, photo, quantity, location, date, message }
        console.log(upadateForm)
        console.log("id :", _id)
        // axios.put(`https://food-share-server.vercel.app/managefood/${_id}`, upadateForm)
        // .then(res=>{
        //     console.log('updated', res.data);
        // })
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Congo!!!',
        //     text: 'Your Order Successfully Placed!!'
        // });
        // form.reset();
        // refetch();

    }



    if (isPending) {
        return <div>Loader</div>
    }

    return (
        <div className="max-w-4xl mx-auto my-8">
            <Helmet><title>Manage Foods </title></Helmet>
            <h1 className="text-center text-2xl font-semibold mb-3">Manage Your Foods</h1>
            <InfiniteScroll dataLength={foods.length} next={foods} height={400}>
                <div className="overflow-x-auto">

                    {
                        foods.length === 0 ?
                            <div className='max-w-sm mx-auto'>
                                <Lottie animationData={emptyload}></Lottie>
                            </div>
                            :
                            <table className="table table-xs">
                                <thead>
                                    <tr>
                                        <th>Food Name</th>
                                        <th>Quantity</th>
                                        <th>Expire Date</th>
                                        <th>Location</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        foods.map(food => <>

                                            <tr>
                                                <td>{food.foodname}</td>
                                                <td>{food.quantity}</td>
                                                <td>{food.date}</td>
                                                <td>{food.location}</td>
                                                <td className="flex justify-center items-center gap-6">
                                                    <Link to={`/edit/${food._id}`} className="text-xl hover:text-green-500"><BiEdit /></Link>
                                                    <button onClick={() => handleDelete(food._id)} className="text-xl hover:text-red-800"><RiDeleteBin5Line /></button>
                                                    <Link to={`/managefoodsdetails/${food._id}`} className="text-2xl hover:text-blue-500"><MdOutlineManageAccounts /></Link>
                                                </td>
                                            </tr>

                                        </>)
                                    }
                                </tbody>
                            </table>
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default ManageFoods;