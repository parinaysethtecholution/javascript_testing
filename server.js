
class ParkingLot {
  constructor(size) {
    this.slots = new Array(size).fill(null);
    this.availableCount = size;
  }

  // This method parks a car in the first available slot
  parkCar(car) {
    if (this.availableCount === 0) return false;
    const emptySlot = this.slots.findIndex(slot => slot === null);
    this.slots[emptySlot] = car;
    this.availableCount--;
    return true;
  }

  // This method removes a car from the parking lot
  removeCar(car) {
    const slotIndex = this.slots.findIndex(slot => slot === car);
    if (slotIndex === -1) return false;
    this.slots[slotIndex] = null;
    this.availableCount++;
    return true;
  }

  // This method returns the number of available slots
  getAvailableSlots() {
    return this.availableCount;
  }

  // This method checks if the parking lot is full
  isFull() {
    return this.availableCount === 0;
  }
}
