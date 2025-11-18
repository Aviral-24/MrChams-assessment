
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddFoundPet = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petType: '',
    breed: '',
    color: '',
    customColor: '',
    location: '',
    dateFound: '',
    description: '',
    contact: '',
    image: ''
  });

  const [errors, setErrors] = useState({});

  const dogBreeds = ['Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Bulldog', 'Beagle', 'Poodle', 'Rottweiler', 'Yorkshire Terrier', 'Boxer', 'Dachshund'];
  const catBreeds = ['Persian', 'Siamese', 'Maine Coon', 'Ragdoll', 'Bengal', 'British Shorthair', 'Abyssinian', 'Scottish Fold', 'Sphynx', 'Russian Blue'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.petType) newErrors.petType = 'Pet type is required';
    if (!formData.breed) newErrors.breed = 'Breed is required';
    if (!formData.color) newErrors.color = 'Color is required';
    if (formData.color === 'Other' && !formData.customColor.trim()) newErrors.customColor = 'Please specify color';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.dateFound) newErrors.dateFound = 'Date found is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact number is required';
    if (!/^\d{10}$/.test(formData.contact.replace(/\D/g, ''))) newErrors.contact = 'Please enter a valid 10-digit phone number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const petData = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      name: 'Unknown',
      finalColor: formData.color === 'Other' ? formData.customColor : formData.color,
      image: formData.image || 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop'
    };

    const existingPets = JSON.parse(localStorage.getItem('foundPets')) || [];
    localStorage.setItem('foundPets', JSON.stringify([...existingPets, petData]));

    alert('Found pet report submitted successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Report a Found Pet</h1>
            <p className="text-gray-600">Help reunite a lost pet with its family</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Type *
                </label>
                <select
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.petType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Pet Type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="other">Other</option>
                </select>
                {errors.petType && <p className="text-red-500 text-sm mt-1">{errors.petType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Breed *
                </label>
                <select
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.breed ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Breed</option>
                  {formData.petType === 'dog' && dogBreeds.map(breed => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                  {formData.petType === 'cat' && catBreeds.map(breed => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                  {formData.petType === 'other' && (
                    <option value="mixed">Mixed/Other</option>
                  )}
                </select>
                {errors.breed && <p className="text-red-500 text-sm mt-1">{errors.breed}</p>}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color *
              </label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.color ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Color</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Brown">Brown</option>
                <option value="Golden">Golden</option>
                <option value="Gray">Gray</option>
                <option value="Other">Other</option>
              </select>
              {formData.color === 'Other' && (
                <input
                  type="text"
                  name="customColor"
                  value={formData.customColor}
                  onChange={handleChange}
                  placeholder="Specify color"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                />
              )}
              {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
              {errors.customColor && <p className="text-red-500 text-sm mt-1">{errors.customColor}</p>}
            </div>

      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Found Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Area, street, landmark where found"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Found *
                </label>
                <input
                  type="date"
                  name="dateFound"
                  value={formData.dateFound}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dateFound ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dateFound && <p className="text-red-500 text-sm mt-1">{errors.dateFound}</p>}
              </div>
            </div>

 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Contact Number *
              </label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.contact ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="10-digit phone number"
              />
              {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the pet's appearance, condition, behavior, collar, distinctive features, etc."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Photo (Optional)
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste image URL here"
              />
              <p className="text-sm text-gray-500 mt-1">
                A clear photo helps owners identify their pet quickly
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Report Found Pet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFoundPet;