const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { apiOptions, movieVideoUrl } = require("../Constants/apiConstants");
const { setMovieTrailer } = require("../store/moviesSlice");
const { isEmpty } = require("lodash");

const useFetchMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = useSelector(store => store?.movie?.movieTrailer);

  // Fetches the movie trailer from the API and dispatches it to the Redux store
  const fetchTrailer = async () => {
    try {
      // Attempt to fetch the movie video data from the API
      const apiData = await fetch(movieVideoUrl(movieId), apiOptions);
      const jsonData = await apiData.json();

      // Initialize an array to hold trailer videos
      let trailers;

      // Check if jsonData contains results and filter for trailers
      if (jsonData && jsonData.results) {
        trailers = jsonData.results.filter((elem) => elem?.type === "Trailer");
      }

      // Determine the trailer object to dispatch
      let trailerObject = (trailers && trailers.length > 0) ? trailers[0] : jsonData.results[0];

      // Dispatch the trailer object to the Redux store
      dispatch(setMovieTrailer(trailerObject));
    } catch (error) {
      // Log the error if the API call fails
      console.error("Failed to fetch movie trailer:", error);
    }
  };

  // Use the useEffect hook to fetch the trailer if it's not already available
  useEffect(() => {
    // If the trailer is not already in the Redux store, fetch it
    if (isEmpty(trailer)) {
      fetchTrailer();
    }
  }, [movieId, trailer]); // Added dependencies to the useEffect hook
};

export default useFetchMovieTrailer;

// ParkingLot class to manage parking slots
class ParkingLot {
  constructor(size) {
    this.slots = new Array(size).fill(null); // Initialize parking slots
    this.availableCount = size; // Set the count of available slots
  }

  // Parks a car in the first available slot and returns a boolean status
  parkCar(car) {
    if (this.isFull()) return false; // Check if the parking lot is full

    const emptySlot = this.slots.findIndex(slot => slot === null); // Find the first empty slot
    this.slots[emptySlot] = car; // Assign the car to the empty slot
    this.availableCount--; // Decrement the count of available slots

    return true; // Parking successful
  }

  // Removes a car from the parking lot and returns a boolean status
  removeCar(car) {
    const slotIndex = this.slots.findIndex(slot => slot === car); // Find the car's slot index

    if (slotIndex === -1) return false; // Car not found

    this.slots[slotIndex] = null; // Remove the car from the slot
    this.availableCount++; // Increment the count of available slots

    return true; // Removal successful
  }

  // Returns the number of available slots in the parking lot
  getAvailableSlots() {
    return this.availableCount;
  }

  // Checks if the parking lot is full and returns a boolean
  isFull() {
    return this.availableCount === 0;
  }
}

// Example usage of the ParkingLot class
const lot = new ParkingLot(10);
lot.parkCar("CAR123");
lot.parkCar("TRUCK789");
console.log(lot.getAvailableSlots()); // Outputs: 8
console.log(lot.removeCar("TRUCK789")); // Outputs: true
console.log(lot.isFull()); // Outputs: false