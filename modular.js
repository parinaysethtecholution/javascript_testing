
export function returnWeatherDetails(object) {
  // Add comments to explain the purpose of this function
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

// Refactored ParkingLot class
class ParkingLot {
  constructor(size) {
    this.slots = new Array(size).fill(null);
    this.availableCount = size;
  }

  parkCar(car) {
    // Check if the parking lot is full
    if (this.availableCount === 0) return false;
    // Find the first available slot
    const emptySlot = this.slots.findIndex(slot => slot === null);
    // Park the car in the available slot
    this.slots[emptySlot] = car;
    this.availableCount--;
    return true;
  }

  removeCar(car) {
    // Find the slot index where the car is parked
    const slotIndex = this.slots.findIndex(slot => slot === car);
    // If the car is not found, return false
    if (slotIndex === -1) return false;
    // Remove the car from the slot and increment the available count
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
