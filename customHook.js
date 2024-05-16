const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { apiOptions, movieVideoUrl } = require("../Constants/apiConstants");
const { setMovieTrailer } = require("../store/moviesSlice");
const { isEmpty } = require("lodash");

const useFetchMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = useSelector(store => store?.movie?.movieTrailer);

  // This function fetches the movie trailer from the API
  const fetchTrailer = async () => {
    // Fetch the movie video data from the API
    const apiData = await fetch(movieVideoUrl(movieId), apiOptions);
    const jsonData = await apiData.json();

    // Filter the results to get only the trailer videos
    let trailers;
    if (jsonData && jsonData.results) {
      trailers = jsonData.results.filter((elem) => {
        // Check if the video type is "Trailer"
        if (elem && elem.type === "Trailer") {
          return true;
        }
        return false;
      });
    }

    // Get the first trailer video or the first result if no trailers are found
    let trailerObject;
    if (trailers && trailers.length > 0) {
      trailerObject = trailers[0];
    } else {
      trailerObject = jsonData.results[0];
    }

    // Dispatch the trailer object to the Redux store
    dispatch(setMovieTrailer(trailerObject));
  };

  // Use the useEffect hook to fetch the trailer if it's not already available
  useEffect(() => {
    if (isEmpty(trailer)) {
      fetchTrailer();
    }
  }, []);
};

export default useFetchMovieTrailer;

// ParkingLot class
class ParkingLot {
  constructor(size) {
    // Initialize the parking slots with null values
    this.slots = new Array(size).fill(null);
    // Keep track of the available slot count
    this.availableCount = size;
  }

  // This function parks a car in the first available slot
  parkCar(car) {
    // If there are no available slots, return false
    if (this.availableCount === 0) return false;

    // Find the first available slot
    const emptySlot = this.slots.findIndex(slot => slot === null);

    // Park the car in the available slot
    this.slots[emptySlot] = car;

    // Decrement the available slot count
    this.availableCount--;

    return true;
  }

  // This function removes a car from the parking lot
  removeCar(car) {
    // Find the index of the car in the slots
    const slotIndex = this.slots.findIndex(slot => slot === car);

    // If the car is not found, return false
    if (slotIndex === -1) return false;

    // Remove the car from the slot
    this.slots[slotIndex] = null;

    // Increment the available slot count
    this.availableCount++;

    return true;
  }

  // This function returns the number of available slots
  getAvailableSlots() {
    return this.availableCount;
  }

  // This function checks if the parking lot is full
  isFull() {
    return this.availableCount === 0;
  }
}

// Example usage
const lot = new ParkingLot(10);
lot.parkCar("CAR123");
lot.parkCar("TRUCK789");
console.log(lot.getAvailableSlots()); // 8
console.log(lot.removeCar("TRUCK789")); // true
console.log(lot.isFull()); // false