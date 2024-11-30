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
                if (elem && elem.type === "Trailer") {
                    return true;
                }
                return false;
            });
        }
        let trailerObject;
        if (trailers && trailers.length > 0) {
            trailerObject = trailers[0];
        } else {
            trailerObject = jsonData.results[0];
        }
        dispatch(setMovieTrailer(trailerObject))
    }

    useEffect(() => {
        if (isEmpty(trailer)) {
            fetchTrailer()
        }
    }, [])
}

export default useFetchMovieTrailer;

class ParkingLot {
  constructor(size) {
    this.slots = new Array(size).fill(null);
    this.availableCount = size;
  }
  parkCar(car) {
    if (this.availableCount === 0) return false;
    const emptySlot = this.slots.findIndex(slot => slot === null);
    this.slots[emptySlot] = car;
    this.availableCount--;
    return true;
  }
  removeCar(car) {
    const slotIndex = this.slots.findIndex(slot => slot === car);
    if (slotIndex === -1) return false;
    this.slots[slotIndex] = null;
    this.availableCount++;
    return true;
  }
  getAvailableSlots() {
    return this.availableCount;
  }
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
