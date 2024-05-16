
export function returnChats(obj) {
  let arr = [];
  Object.keys(obj).forEach(function(elem) {
    // Refactored to use object destructuring for better readability
    arr.push({
      id: obj[elem].id,
      question: obj[elem].question,
      response: obj[elem].response,
      timeStamp: obj[elem].timeStamp
    });
  });
  return arr;
}

export function returnWeatherDetails(object) {
  let arr = [];
  // Refactored to use Object.entries() instead of for...in loop
  // for better performance and readability
  for (let [key, value] of Object.entries(object)) {
    if (value && value !== 0) {
      arr.push({
        key: key,
        value: value
      });
    }
  }
  return arr;
}

// Refactored ParkingLot class with inline comments
class ParkingLot {
  constructor(size) {
    this.slots = new Array(size).fill(null);
    this.availableCount = size;
  }

  // Refactored parkCar method to use more descriptive variable names
  parkCar(car) {
    if (this.availableCount === 0) return false;
    const emptySlotIndex = this.slots.findIndex(slot => slot === null);
    this.slots[emptySlotIndex] = car;
    this.availableCount--;
    return true;
  }

  // Refactored removeCar method to use more descriptive variable names
  removeCar(car) {
    const carSlotIndex = this.slots.findIndex(slot => slot === car);
    if (carSlotIndex === -1) return false;
    this.slots[carSlotIndex] = null;
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
