import React from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { Link } from 'react-router-dom';
import homePageImage from '../assets/Images/homePageImage.png'
export default function HomePage() {
  return (
        <HomeLayout>
            <div className= "pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]" >
                <div className= "w-1/2 space-y-6">
                    <h1 className= "text-5xl font-semibold">
                        Welcome to <br />
                        <span className= "text-yellow-500 font-bold">
                            Learning Platform
                        </span>
                    </h1>
                    <p className=' text-gray-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, qui!</p>
                    <div className='space-x-6'>
                        {/* course explore button  */}
                        <Link to="/course">
                            <button className='bg-yellow-500 px-3 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                                Explore Courses
                            </button>
                        </Link>
                        {/* contact us button  */}
                         <Link to="/contact">
                            <button className='border border-yellow-500 px-3 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                                Contact Us
                            </button>
                        </Link>

                    </div>

                </div>
                {/* home page image  */}
                <div className='w-1/2 flex items-center justify-center '>
                    <img src={homePageImage} alt="Home page " />
                </div>
            </div>
        </HomeLayout>

  )
}
