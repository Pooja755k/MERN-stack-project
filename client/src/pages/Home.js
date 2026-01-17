// Home Page - Car listing and search
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import carService from '../services/bookingService';
import { formatCurrency } from '../utils/helpers';
import './Home.css';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    seatingCapacity: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    page: 1,
  });

  // Fetch cars on component mount and when filters change
  useEffect(() => {
    fetchCars();
  }, [filters]);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const response = await carService.getAllCars(filters);
      setCars(response.data || []);
    } catch (error) {
      toast.error('Failed to load cars');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to first page on filter change
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      page: 1,
    }));
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Ride</h1>
          <p>Book affordable, reliable cars in minutes</p>
        </div>
      </section>

      <div className="container">
        {/* Filters Section */}
        <section className="filters-section">
          <h2>Search & Filter</h2>
          <form className="filters-form" onSubmit={handleSearch}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="search">Search Car</label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Car name, brand..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={filters.brand}
                  onChange={handleFilterChange}
                  placeholder="e.g., Toyota, Honda"
                />
              </div>

              <div className="form-group">
                <label htmlFor="fuelType">Fuel Type</label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={filters.fuelType}
                  onChange={handleFilterChange}
                >
                  <option value="">All Types</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="seatingCapacity">Seating</label>
                <select
                  id="seatingCapacity"
                  name="seatingCapacity"
                  value={filters.seatingCapacity}
                  onChange={handleFilterChange}
                >
                  <option value="">All Sizes</option>
                  <option value="2">2 Seater</option>
                  <option value="4">4 Seater</option>
                  <option value="5">5 Seater</option>
                  <option value="7">7 Seater</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="minPrice">Min Price (₹/day)</label>
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="maxPrice">Max Price (₹/day)</label>
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="10000"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </section>

        {/* Cars Grid */}
        <section className="cars-section">
          <h2>Available Cars</h2>
          {isLoading ? (
            <div className="loading-container">
              <div className="loading"></div>
              <p>Loading cars...</p>
            </div>
          ) : cars.length > 0 ? (
            <div className="cars-grid">
              {cars.map(car => (
                <div key={car._id} className="car-card">
                  {/* Car Image */}
                  <div className="car-image">
                    {car.images && car.images.length > 0 ? (
                      <img
                        src={`http://localhost:5000${car.images[0]}`}
                        alt={car.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x250?text=Car+Image';
                        }}
                      />
                    ) : (
                      <div className="placeholder">No Image</div>
                    )}
                  </div>

                  {/* Car Info */}
                  <div className="car-info">
                    <h3>{car.name}</h3>
                    <p className="car-brand">{car.brand} {car.model} ({car.year})</p>

                    {/* Car Details */}
                    <div className="car-details">
                      <span>🚗 {car.seatingCapacity} Seater</span>
                      <span>⛽ {car.fuelType}</span>
                      <span>🔄 {car.transmission}</span>
                    </div>

                    {/* Price */}
                    <div className="car-price">
                      <span className="price">{formatCurrency(car.rentPerDay)}</span>
                      <span className="per-day">per day</span>
                    </div>

                    {/* Actions */}
                    <div className="car-actions">
                      <Link to={`/cars/${car._id}`} className="btn btn-primary btn-sm">
                        View Details
                      </Link>
                      <Link to={`/booking/${car._id}`} className="btn btn-secondary btn-sm">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-cars">
              <p>No cars found matching your filters.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
