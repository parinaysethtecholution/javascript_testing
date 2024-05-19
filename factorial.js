
function factorialIterative(n) {
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log(factorialIterative(5)); // Output: 120


function factorialRecursive(n) {
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
}

console.log(factorialRecursive(5)); // Output: 120

class ParkingLot {
  constructor(numSlots) {
    // Initialize the parking lot with the specified number of slots
    this.slots = new Array(numSlots).fill(null); // Array to store car IDs (null for empty)
  }

  park(carId) {
    // Check if the parking lot is full
    if (this.isFull()) {
      return "Parking lot is full!";
    }

    // Find the first available slot and park the car
    for (let i = 0; i < this.slots.length; i++) {
      if (this.slots[i] === null) {
        this.slots[i] = carId;
        return `Car ${carId} parked in slot ${i + 1}`;
      }
    }
  }

  leave(carId) {
    // Find the slot where the car is parked
    const slotIndex = this.findCarSlot(carId);
    if (slotIndex === -1) {
      return "Car not found in parking lot";
    }

    // Remove the car from the slot
    this.slots[slotIndex] = null;
    return `Car ${carId} left from slot ${slotIndex + 1}`;
  }

  isFull() {
    // Check if all slots are occupied
    return this.slots.every(slot => slot !== null);
  }

  findCarSlot(carId) {
    // Find the index of the slot where the car is parked
    return this.slots.indexOf(carId);
  }
}

// Example usage
const parkingLot = new ParkingLot(5); // Create parking lot with 5 slots
console.log(parkingLot.park("CAR123")); // Park car CAR123
console.log(parkingLot.park("TRUCK789")); // Park car TRUCK789
console.log(parkingLot.park("BIKE456")); // Park car BIKE456
console.log(parkingLot.park("SCOOTER001")); // Park car SCOOTER001 (should be full)

console.log(parkingLot.leave("CAR123")); // Remove car CAR123
console.log(parkingLot.park("MOTORCYCLE999")); // Park car MOTORCYCLE999 (should take the free slot)

console.log(parkingLot.slots); // Output: ["CAR123", "TRUCK789", "BIKE456", null, "MOTORCYCLE999"]
