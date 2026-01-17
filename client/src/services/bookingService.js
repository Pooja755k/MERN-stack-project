// Car Service - API calls for car operations
import api from './api';

const carService = {
  // Get all cars with filters
  getAllCars: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.fuelType) params.append('fuelType', filters.fuelType);
    if (filters.seatingCapacity) params.append('seatingCapacity', filters.seatingCapacity);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const response = await api.get(`/cars?${params.toString()}`);
    return response.data;
  },

  // Get car by ID
  getCarById: async (carId) => {
    const response = await api.get(`/cars/${carId}`);
    return response.data;
  },

  // Add new car (Admin only)
  addCar: async (carData, images) => {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(carData).forEach(key => {
      if (key === 'features') {
        formData.append(key, JSON.stringify(carData[key]));
      } else {
        formData.append(key, carData[key]);
      }
    });

    // Add images
    if (images) {
      images.forEach(image => {
        formData.append('images', image);
      });
    }

    const response = await api.post('/cars', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Update car (Admin only)
  updateCar: async (carId, carData, newImages = []) => {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(carData).forEach(key => {
      if (key === 'features') {
        formData.append(key, JSON.stringify(carData[key]));
      } else {
        formData.append(key, carData[key]);
      }
    });

    // Add new images
    if (newImages) {
      newImages.forEach(image => {
        formData.append('images', image);
      });
    }

    const response = await api.put(`/cars/${carId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Delete car (Admin only)
  deleteCar: async (carId) => {
    const response = await api.delete(`/cars/${carId}`);
    return response.data;
  },

  // Delete car image (Admin only)
  deleteCarImage: async (carId, imageUrl) => {
    const response = await api.delete(`/cars/${carId}/image`, {
      data: { imageUrl },
    });
    return response.data;
  },
};

export default carService;
