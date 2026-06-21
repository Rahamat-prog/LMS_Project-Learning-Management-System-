import React from 'react'
import { FiMenu } from "react-icons/fi"
import { AiFillCloseCircle } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import stat from 'daisyui/components/stat';
import { logoutUser } from '../Redux/slices/AuthSlice';


export default function HomeLayout({ children }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking user is logged in or not 
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    // for displaying the option access for role
    const role = useSelector((state) => state?.auth?.role);

    // function to change the width of the drawer
    const changeWidth = () => {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';

    }
    // function to hide the drawer
    const hideDrawer = () => {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }

    // logout handle
    const handleLogout = (e) => {
       e.preventDefault();
       // call the logout reducer from the authSlice that clear locaStorage and resets teh redux state 
        dispatch(logoutUser());
        // 
        navigate("/login");
    }

    return (
        <div className=" min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-fit">
                {/* input properties ke basis pe decide ho raha h drawer open h ki nahi */}
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                {/* page content here  */}
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer ralative" >
                        <FiMenu
                            onClick={changeWidth}
                            className="font-bold text-white m-4 text-2xl"
                        />
                    </label>

                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    {/* side bar contect here  */}
                    <ul className="menu p-4 w-48 h-full sm:w-80 bg-base-100 text-base-content relative">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>

                        </li>

                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to='/admin/dashboard'>
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/course">All Courses</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>

                          {!isLoggedIn && (
                            <li className="absolute bottom-4 w-[40%]">
                                <div className="w-full flex items-center gap-7">
                                    <button className='btn btn-primary px-4 py-1 font-semibold rounded-md w-full  hover:bg-blue-700'>
                                        <Link to="/login">Login</Link>
                                    </button>
                                    <button className='btn btn-secondary px-4 py-1 font-semibold rounded-md w-full hover:bg-pink-700'>
                                        <Link to="/signup">Signup</Link>
                                    </button>
                                </div>
                            </li>
                        )}

                          {isLoggedIn && (
                            <li className="absolute bottom-4 w-[40%]">
                                <div className='w-full flex items-center gap-7'>
                                    <button className='btn btn-primary px-4 py-1 font-semibold rounded-md w-full  hover:bg-blue-700 '>
                                        <Link to='/user/profile'>Profile</Link>
                                    </button>
                                    <button className='btn btn-secondary px-4 py-1 font-semibold rounded-md w-full hover:bg-pink-700'>
                                        <Link onClick={handleLogout}>Logout</Link>
                                    </button>
                                </div>
                            </li>

                        )}
                    </ul>

                </div>

            </div>

            {children}
            <Footer />
        </div>
    )
}
