import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TestimonialCard from '../components/TestimonialCard.jsx';

const Home = () => {
  const [lostPets, setLostPets] = useState([]);
  const [foundPets, setFoundPets] = useState([]);

  useEffect(() => {

    const savedLostPets = JSON.parse(localStorage.getItem('lostPets')) || [];
    const savedFoundPets = JSON.parse(localStorage.getItem('foundPets')) || [];
    
    setLostPets(savedLostPets.slice(-4).reverse());
    setFoundPets(savedFoundPets.slice(-4).reverse());
  }, []);

  const testimonials = [
    {
      name: "Arnav Kapoor",
      role: "Dog Owner",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "Thanks to PetReunite, I found my golden retriever Max within 24 hours! The community support was amazing."
    },
    {
      name: "Monu Singh",
      role: "Cat Rescuer",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "As a frequent rescuer, this platform makes it so easy to connect found pets with their worried owners."
    },
    {
      name: "Minakshi Mehta",
      role: "Pet Lover",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "The quick response and caring community helped reunite our family with our beloved cat, Whiskers!"
    }
  ];

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Furry Friend
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Help Reunite Lost Pets with Their Families
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/add-lost-pet" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Report Lost Pet
            </Link>
            <Link 
              to="/add-found-pet" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Report Found Pet
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Recently Reported Lost Pets
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Help these beloved pets find their way back home. If you've seen any of them, please contact the owner immediately.
            </p>
          </div>
          
          {lostPets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {lostPets.map((pet, index) => (
                <PetCard key={index} pet={pet} type="lost" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No lost pets reported yet. Be the first to report one!</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link 
              to="/add-lost-pet" 
              className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
            >
              Report a Lost Pet
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Recently Found Pets
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These pets have been found and are waiting to be reunited with their families. Could one of them be yours?
            </p>
          </div>
          
          {foundPets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {foundPets.map((pet, index) => (
                <PetCard key={index} pet={pet} type="found" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No found pets reported yet. Help reunite a lost pet!</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link 
              to="/add-found-pet" 
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
            >
              Report a Found Pet
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Success Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from pet owners who have been reunited with their beloved companions through our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              About PetReunite
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              PetReunite is a community-driven platform dedicated to helping lost pets find their way back home. 
              We believe every pet deserves to be safe with their family, and we're committed to making that happen 
              through technology, community support, and compassionate action.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🐾</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Community Powered</h3>
                <p className="text-gray-600 text-sm">Thousands of volunteers helping pets every day</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Quick Response</h3>
                <p className="text-gray-600 text-sm">Instant alerts and notifications in your area</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Compassionate Care</h3>
                <p className="text-gray-600 text-sm">We treat every pet as if they were our own</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;