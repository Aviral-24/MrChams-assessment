import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.photo} 
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">"{testimonial.quote}"</p>
      <div className="flex text-yellow-400 mt-3">
        {'★'.repeat(5)}
      </div>
    </div>
  );
};

export default TestimonialCard;