
export function returnWeatherDetails(object) {
  // Refactored code for the returnWeatherDetails function
  let arr = [];
  for (let key in object) {
    if (object[key] && object[key] !== 0) {
      arr.push({
        key: key,
        value: object[key]
      });
    }
  }
  return arr;
}

// The ParkingLot class has been added to the code, which provides functionality to manage a parking lot.
// The constructor initializes the parking slots and the available count.
// The parkCar method parks a car in an available slot, if any.
// The removeCar method removes a car from a slot, if present.
// The getAvailableSlots method returns the number of available slots.
// The isFull method checks if the parking lot is full.
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
