import React from 'react';
import './Banner.css'
import banner from '../../../assets/burger.png'
const Banner = () => {
    return (
        // <div className='bg d-flex align-items-center'>
        //     <Container className='py-5 text-white'>
        //         <Row xs={1} md={2} className='d-flex align-items-center'>
        //             <Col xs={{ order: 2 }} md={{ order: 1 }}>
        //                 <img className='img-fluid' src={banner} alt="" />
        //             </Col>
        //             <Col xs={{ order: 1 }} md={{ order: 2 }}>
        //                 <div>
        //                     <h1 className='w-50'>It is even better than an expensive cookery book</h1>
        //                     <p>Learn how to make your favorite restaurant’s dishes</p>
        //                 </div>
        //             </Col>
        //         </Row>


        //     </Container>
        // </div>
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