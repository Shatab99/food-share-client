import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import Featured from './Featured';
import AboutUs from './AboutUs';
import ContactInfo from './ContactInfo';

const Home = () => {
    return (
        <div>
            <Helmet><title>HOME</title></Helmet>
            <Banner />
            <Featured />
            <div className='px-5 lg:px-0'>
                <AboutUs />
                <ContactInfo />
            </div>
        </div>
    );
};

export default Home;