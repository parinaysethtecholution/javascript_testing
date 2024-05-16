
// Refactored code with improved readability, efficiency, and modularity

// The ParkingLot class has been added to handle the parking lot functionality
class ParkingLot {
  constructor(size) {
    this.slots = new Array(size).fill(null);
    this.availableCount = size;
  }

  // Attempts to park a car in the parking lot
  parkCar(car) {
    if (this.availableCount === 0) return false;
    const emptySlot = this.slots.findIndex(slot => slot === null);
    this.slots[emptySlot] = car;
    this.availableCount--;
    return true;
  }

  // Removes a car from the parking lot
  removeCar(car) {
    const slotIndex = this.slots.findIndex(slot => slot === car);
    if (slotIndex === -1) return false;
    this.slots[slotIndex] = null;
    this.availableCount++;
    return true;
  }

  // Returns the number of available slots in the parking lot
  getAvailableSlots() {
    return this.availableCount;
  }

  // Checks if the parking lot is full
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
