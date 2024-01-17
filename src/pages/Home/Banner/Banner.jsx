import React from 'react';
import './Banner.css'
import banner from '../../../assets/burger.png'
const Banner = () => {
    return (
        <div className="hero bg">
            <div className="hero-content flex-col lg:flex-row">
                <img className='img-fluid order-2 lg:order-1' src={banner} alt="" />
                <div className='text-white order-1 lg:order-2'>
                    <h1 className='w-1/2 text-3xl'>It is even better than an expensive cookery book</h1>
                    <p className='text-lg'>Learn how to make your favorite restaurant’s dishes</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;