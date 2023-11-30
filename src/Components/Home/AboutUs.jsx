import React from 'react';

const AboutUs = () => {
  return (
    <section id="about-us" className="bg-white py-16 max-w-4xl mx-auto">
      <div className="container  mx-auto flex flex-wrap items-center">
        <div className="w-full md:w-1/2">
          <img
            src='https://t4.ftcdn.net/jpg/02/16/24/93/360_F_216249364_Iatf7l9P8clB4BqyhxFVi2h7a6oG5OhE.jpg'
            alt="About Us Image"
            className="w-full h-auto rounded-2xl"
          />
        </div>
        <div className="w-full md:w-1/2 pl-4">
          <h2 className="text-3xl font-semibold text-gray-800">About Us</h2>
          <p className="mt-4 text-gray-600">
            We are on a mission to make a positive impact by connecting people with surplus food to those who need it most. Our platform is designed to reduce food waste and ensure that no one goes hungry in our community.
          </p>
          <p className="mt-4 text-gray-600">
            Founded in 2023, our dedicated team is passionate about creating a sustainable and compassionate world. We believe that every meal shared is a step towards a better future.
          </p>
          <p className="mt-4 text-gray-600">
            Join us in our journey to make a difference in the lives of people and the planet. Together, we can make a meaningful impact, one meal at a time.
          </p>
          <a
            href="/about"
            className="mt-6 inline-block bg-blue-500 text-white rounded-full px-6 py-3 hover:bg-blue-600 hover:text-white"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
