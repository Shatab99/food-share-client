import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../SecretLayouts/AuthProvider';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(res => {
                console.log("logged Out", res.user)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const navBar = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to={'/availablefoods'}>Available Foods</Link></li>
        {/* those the must be in private routes */}
        {
            user && <>
                <li><Link to={'/addfoods'}>Add Foods</Link></li>
                <li><Link to={'/managefood'}>Manage My Foods </Link></li>
                <li><Link to={'/requestedfoods'}> My Food Request </Link></li>
            </>
        }
    </>


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                        {navBar}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl font-bold">Share<span className='text-orange-700'>FOOD</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navBar}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    {user.displayName}
                                </a>
                            </li>
                            <li><button onClick={handleLogOut} >Logout</button></li>
                        </ul>
                    </div>
                        :
                        <Link to={'/login'} className="btn bg-[#943333] text-white hover:text-black">log in</Link>
                }
            </div>
        </div>
    );
};

export default NavBar;