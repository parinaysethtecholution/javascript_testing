
const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { apiOptions, movieVideoUrl } = require("../Constants/apiConstants");
const { setMovieTrailer } = require("../store/moviesSlice");
const { isEmpty } = require("lodash");


const useFetchMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = useSelector(store => store?.movie?.movieTrailer);
  const fetchTrailer = async () => {
    const apiData = await fetch(movieVideoUrl(movieId), apiOptions);
    const jsonData = await apiData.json();
    let trailers;
    if (jsonData && jsonData.results) {
      trailers = jsonData.results.filter((elem) => {
        // Filter out non-trailer videos
        if (elem && elem.type === "Trailer") {
          return true;
        }
        return false;
      });
    }
    let trailerObject;
    if (trailers && trailers.length > 0) {
      // If trailers are available, take the first one
      trailerObject = trailers[0];
    } else {
      // If no trailers, take the first result
      trailerObject = jsonData.results[0];
    }
    // Dispatch the trailer object to the Redux store
    dispatch(setMovieTrailer(trailerObject))
  }

  useEffect(() => {
    // Check if trailer is not available and fetch it
    if (isEmpty(trailer)) {
      fetchTrailer()
    }
  }, [])
}

export default useFetchMovieTrailer;

// ParkingLot class
class ParkingLot {
  constructor(size) {
    // Initialize slots with null values
    this.slots = new Array(size).fill(null);
    // Keep track of available slots
    this.availableCount = size;
  }
  parkCar(car) {
    // If no slots are available, return false
    if (this.availableCount === 0) return false;
    // Find the first available slot
    const emptySlot = this.slots.findIndex(slot => slot === null);
    // Park the car in the available slot
    this.slots[emptySlot] = car;
    // Decrement the available count
    this.availableCount--;
    return true;
  }
  removeCar(car) {
    // Find the index of the car
    const slotIndex = this.slots.findIndex(slot => slot === car);
    // If car is not found, return false
    if (slotIndex === -1) return false;
    // Remove the car from the slot
    this.slots[slotIndex] = null;
    // Increment the available count
    this.availableCount++;
    return true;
  }
  getAvailableSlots() {
    // Return the number of available slots
    return this.availableCount;
  }
  isFull() {
    // Check if there are no available slots
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
