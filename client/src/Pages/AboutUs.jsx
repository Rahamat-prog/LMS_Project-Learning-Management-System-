import React from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import aboutMainImage from '../assets/Images/aboutmainImage.png'
import apj from '../assets/Images/apj.png'
import bilGate from '../assets/Images/billGates.png'
import einstein from '../assets/Images/einstein.png'
import nelsonMandela from '../assets/Images/nelsonMandela.png'
import steveJob from '../assets/Images/steveJobs.png'

function AboutUs() {

    return (
        <HomeLayout>
            <div classname="pl-20 pt-20 flex flex-col text-white">
                <div className='flex items-center gap-5 mx-10'>
                    <section className='w-1/2 space-y-10'>
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide the afoordable and quality education to the world.
                            We are providing the platform for the aspiring teachers and students to share
                            their skills, creativity and knowledge to each other to empower and contribute
                            in the growth and wellness of mankind.
                        </p>
                    </section>
                    <div className='w-1/2'>
                        <img src={aboutMainImage} alt="about image"
                            id='test'
                            className='drop-shadow-2xl'
                            style={{ filter: 'drop-shadow(0px 10px 10px rgb(0, 0 ,0 ))' }}
                        />

                    </div>
                </div>
                {/* buid carousel for left to right image  */}
                <div className="carousel w-1/2 m-auto flex ">
                {/* image 1 apj abdul kalam  */}
                    <div id="slide1" className="carousel-item relative w-full">
                        <div className='flex flex-col items-center justify-center gap-2 px-[15%]'>
                            <img
                                src={apj}
                                className="w-1/3 border rounded-full" />
                            <p className='text-xl text-gray-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, tempore?</p>
                            <h3 className='text-2xl font-semibold'>APJ Abdul Kalam</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide5" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    {/* image 2  */}
                    <div id="slide2" className="carousel-item relative w-full">
                        <div className='flex flex-col items-center justify-center gap-2 px-[15%]'>
                            <img
                                src={bilGate}
                                className="w-1/3 border rounded-full" />
                            <p className='text-xl text-gray-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, tempore?</p>
                            <h3 className='text-2xl font-semibold'>Bil Gate </h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <div className='flex flex-col items-center justify-center gap-2 px-[15%]'>
                            <img
                                src={einstein}
                                className="w-1/3 border rounded-full" />
                            <p className='text-xl text-gray-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, tempore?</p>
                            <h3 className='text-2xl font-semibold'>Einstein</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <div className='flex flex-col items-center justify-center gap-2 px-[15%]'>
                            <img
                                src={nelsonMandela}
                                className="w-1/3 border rounded-full" />
                            <p className='text-xl text-gray-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, tempore?</p>
                            <h3 className='text-2xl font-semibold'>NelsonMandela</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide3" className="btn btn-circle">❮</a>
                                <a href="#slide5" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                     <div id="slide5" className="carousel-item relative w-full">
                        <div className='flex flex-col items-center justify-center gap-2 px-[15%]'>
                            <img
                                src={steveJob}
                                className="w-1/3 border rounded-full" />
                            <p className='text-xl text-gray-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, tempore?</p>
                            <h3 className='text-2xl font-semibold'>StevJob</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide4" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;