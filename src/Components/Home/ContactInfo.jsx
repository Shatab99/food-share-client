import React from 'react';

const ContactInfo = () => {
    return (
        <section id="contact" className="bg-gray-100 py-16 max-w-4xl mx-auto rounded-2xl mb-12 shadow-2xl">
            <div className="container mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-gray-800">Contact Us</h2>
                    <p className="mt-4 text-gray-600">
                        Have questions or need assistance? We're here to help. Feel free to reach out to us through the following channels:
                    </p>
                </div>
                <div className="mt-12 flex flex-wrap justify-center items-center">
                    <div className="w-full md:w-1/3 text-center">
                        <div className="mb-4">
                            <i className="fas fa-envelope text-3xl text-blue-500"></i>
                        </div>
                        <p className="text-lg text-gray-700">
                            Email Us
                        </p>
                        <a href="mailto:contact@example.com" className="text-blue-500 hover:underline">shatabag4749@gmail.com</a>
                    </div>
                    <div className="w-full md:w-1/3 text-center">
                        <div className="mb-4">
                            <i className="fas fa-phone text-3xl text-blue-500"></i>
                        </div>
                        <p className="text-lg text-gray-700">
                            Call Us
                        </p>
                        <a href="tel:+123456789" className="text-blue-500 hover:underline">+8801*******</a>
                    </div>
                    <div className="w-full md:w-1/3 text-center">
                        <div className="mb-4">
                            <i className="fas fa-map-marker-alt text-3xl text-blue-500"></i>
                        </div>
                        <p className="text-lg text-gray-700">
                            Visit Us
                        </p>
                        <p className="text-gray-600">
                            Bashbari Road <br />
                            Mohammodpur, Dhaka
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactInfo;
