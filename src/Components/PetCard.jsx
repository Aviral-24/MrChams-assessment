import React from 'react';

const PetCard = ({ pet, type = 'lost' }) => {
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={pet.image} 
          alt={pet.name}
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-medium ${
          type === 'lost' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          {type === 'lost' ? 'Lost' : 'Found'}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {pet.breed}
          </span>
        </div>
        
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {pet.location}
          </div>
          
          {pet.date && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {pet.date}
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          {truncateDescription(pet.description)}
        </p>
        
        {pet.contact && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">Contact: {pet.contact}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetCard;