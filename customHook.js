
// Import necessary modules and functions
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiOptions, movieVideoUrl } from '../Constants/apiConstants';
import { setMovieTrailer } from '../store/moviesSlice';
import { isEmpty } from 'lodash';

// Custom hook to fetch movie trailer
const useFetchMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store?.movie?.movieTrailer);

  // Function to fetch trailer data from API
  const fetchTrailer = async () => {
    try {
      const apiData = await fetch(movieVideoUrl(movieId), apiOptions);
      const jsonData = await apiData.json();

      // Filter trailers from the API response
      const trailers = jsonData.results?.filter(
        (elem) => elem && elem.type === 'Trailer'
      );

      // Select the first trailer or the first video if no trailers are available
      const trailerObject = trailers.length > 0 ? trailers[0] : jsonData.results[0];

      // Dispatch the trailer object to the Redux store
      dispatch(setMovieTrailer(trailerObject));
    } catch (error) {
      console.error('Error fetching movie trailer:', error);
    }
  };

  // Fetch trailer when the component mounts and there is no trailer in the store
  useEffect(() => {
    if (isEmpty(trailer)) {
      fetchTrailer();
    }
  }, [trailer]);
};

export default useFetchMovieTrailer;

// Parking Lot class
class ParkingLot {
  constructor(size) {
    // Initialize an array of slots with null values
    this.slots = new Array(size).fill(null);
    // Set the initial available count to the size of the parking lot
    this.availableCount = size;
  }

  // Park a car in the first available slot
  parkCar(car) {
    // Return false if there are no available slots
    if (this.availableCount === 0) return false;

    // Find the index of the first available slot
    const emptySlot = this.slots.findIndex((slot) => slot === null);

    // Park the car in the available slot
    this.slots[emptySlot] = car;
    this.availableCount--;

    // Return true to indicate successful parking
    return true;
  }

  // Remove a car from the parking lot
  removeCar(car) {
    // Find the index of the slot where the car is parked
    const slotIndex = this.slots.findIndex((slot) => slot === car);

    // Return false if the car is not found
    if (slotIndex === -1) return false;

    // Remove the car from the slot
    this.slots[slotIndex] = null;
    this.availableCount++;

    // Return true to indicate successful removal
    return true;
  }

  // Get the number of available slots
  getAvailableSlots() {
    return this.availableCount;
  }

  // Check if the parking lot is full
  isFull() {
    return this.availableCount === 0;
  }
}

// Example usage
const lot = new ParkingLot(10);
lot.parkCar('CAR123');
lot.parkCar('TRUCK789');
console.log(lot.getAvailableSlots()); // Output: 8
console.log(lot.removeCar('TRUCK789')); // Output: true
console.log(lot.isFull()); // Output: false
