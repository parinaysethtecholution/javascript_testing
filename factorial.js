
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

// Refactored Code with comments
class ParkingLot {
    constructor(size) {
        this.slots = new Array(size).fill(null); // Initialize parking slots with null
        this.availableCount = size; // Initialize available slots count
    }
    parkCar(car) {
        if (this.availableCount === 0) return false; // If no slots available, return false
        const emptySlot = this.slots.findIndex(slot => slot === null); // Find first empty slot
        this.slots[emptySlot] = car; // Park the car in the empty slot
        this.availableCount--; // Decrease available slots count
        return true; // Return true if car parked successfully
    }
    removeCar(car) {
        const slotIndex = this.slots.findIndex(slot => slot === car); // Find the car in the slots
        if (slotIndex === -1) return false; // If car not found, return false
        this.slots[slotIndex] = null; // Remove the car from the slot
        this.availableCount++; // Increase available slots count
        return true; // Return true if car removed successfully
    }
    getAvailableSlots() {
        return this.availableCount; // Return the count of available slots
    }
    isFull() {
        return this.availableCount === 0; // Return true if parking lot is full
    }
}

// Example usage
const lot = new ParkingLot(10);
lot.parkCar("CAR123");
lot.parkCar("TRUCK789");
console.log(lot.getAvailableSlots()); // 8
console.log(lot.removeCar("TRUCK789")); // true
console.log(lot.isFull()); // false

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
