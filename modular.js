
export function returnChats(obj) {
  let arr = [];
  Object.keys(obj).forEach(function(elem) {
    arr.push({
      "id": obj[elem].id,
      "question": obj[elem].question,
      "response": obj[elem].response,
      "timeStamp": obj[elem].timeStamp
    });
  });
  return arr;
}

export function returnTaskChats(obj) {
  let arr = [];
  Object.keys(obj).forEach(function(elem) {
    arr.push({
      "id": obj[elem].id,
      "question": obj[elem].question,
      "response": obj[elem].response,
      "taskCreated": obj[elem].taskCreated
    });
  });
  return arr;
}

export function returnCity(str) {
  const match = str.match(/"([^"]*)"/);
  return match ? match[1] : null;
}

export function returnWeatherDetails(object) {
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


class ParkingLot {
  constructor(size) {
    this.slots = new Array(size).fill(null); // Initialize an array of size 'size' with null values
    this.availableCount = size; // Keep track of available slots
  }
  parkCar(car) {
    if (this.availableCount === 0) return false; // No slots available
    const emptySlot = this.slots.findIndex(slot => slot === null); // Find the first available slot
    this.slots[emptySlot] = car; // Park the car in the available slot
    this.availableCount--; // Decrement the available slot count
    return true; // Car parked successfully
  }
  removeCar(car) {
    const slotIndex = this.slots.findIndex(slot => slot === car); // Find the slot where the car is parked
    if (slotIndex === -1) return false; // Car not found
    this.slots[slotIndex] = null; // Remove the car from the slot
    this.availableCount++; // Increment the available slot count
    return true; // Car removed successfully
  }
  getAvailableSlots() {
    return this.availableCount; // Return the number of available slots
  }
  isFull() {
    return this.availableCount === 0; // Check if the parking lot is full
  }
}
// Example usage
const lot = new ParkingLot(10);
lot.parkCar("CAR123");
lot.parkCar("TRUCK789");
console.log(lot.getAvailableSlots()); // 8
console.log(lot.removeCar("TRUCK789")); // true
console.log(lot.isFull()); // false
