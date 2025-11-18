import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddLostPet = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    petType: '',
    breed: '',
    color: '',
    customColor: '',
    size: '',
    customSize: '',
    gender: '',
    dateLost: '',
    location: '',
    description: '',
    microchipId: '',
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

    if (!formData.name.trim()) newErrors.name = 'Pet name is required';
    if (!formData.petType) newErrors.petType = 'Pet type is required';
    if (!formData.breed) newErrors.breed = 'Breed is required';
    if (!formData.color) newErrors.color = 'Color is required';
    if (formData.color === 'Other' && !formData.customColor.trim()) newErrors.customColor = 'Please specify color';
    if (!formData.size) newErrors.size = 'Size is required';
    if (formData.size === 'Other' && !formData.customSize.trim()) newErrors.customSize = 'Please specify size';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateLost) newErrors.dateLost = 'Date lost is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
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
      finalColor: formData.color === 'Other' ? formData.customColor : formData.color,
      finalSize: formData.size === 'Other' ? formData.customSize : formData.size,
      image: formData.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop'
    };
    const existingPets = JSON.parse(localStorage.getItem('lostPets')) || [];
    localStorage.setItem('lostPets', JSON.stringify([...existingPets, petData]));

    alert('Lost pet report submitted successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Report a Lost Pet</h1>
            <p className="text-gray-600">Help us reunite your furry friend with your family</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter pet's name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

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


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size *
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.size ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Other">Other</option>
                </select>
                {formData.size === 'Other' && (
                  <input
                    type="text"
                    name="customSize"
                    value={formData.customSize}
                    onChange={handleChange}
                    placeholder="Specify size"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                  />
                )}
                {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
                {errors.customSize && <p className="text-red-500 text-sm mt-1">{errors.customSize}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Lost *
                </label>
                <input
                  type="date"
                  name="dateLost"
                  value={formData.dateLost}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dateLost ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dateLost && <p className="text-red-500 text-sm mt-1">{errors.dateLost}</p>}
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lost Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Area, street, landmark"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
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
            </div>

 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Microchip ID (Optional)
              </label>
              <input
                type="number"
                name="microchipId"
                value={formData.microchipId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="If your pet has a microchip"
              />
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
                placeholder="Describe your pet's appearance, behavior, distinctive features, collar color, etc."
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
                You can upload an image to imgur.com or similar service and paste the URL here
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Report Lost Pet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLostPet;