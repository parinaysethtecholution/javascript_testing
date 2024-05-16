/**
 * Calculates the factorial of a non-negative integer iteratively.
 * @param {number} n - A non-negative integer whose factorial is to be calculated.
 * @returns {number|string} The factorial of the given number or an error message for negative inputs.
 */
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

/**
 * Represents a parking lot with a fixed number of slots.
 */
class ParkingLot {
    /**
     * Creates a parking lot of a given size.
     * @param {number} size - The total number of parking slots in the lot.
     */
    constructor(size) {
        this.slots = new Array(size).fill(null);
        this.availableCount = size;
    }

    /**
     * Parks a car in the first available slot.
     * @param {string} car - The identifier for the car.
     * @returns {boolean} True if the car was successfully parked, false if the parking lot is full.
     */
    parkCar(car) {
        if (this.availableCount === 0) return false;
        
        const emptySlot = this.slots.findIndex(slot => slot === null);
        this.slots[emptySlot] = car;
        this.availableCount--;
        return true;
    }

    /**
     * Removes a car from the parking lot.
     * @param {string} car - The identifier for the car to be removed.
     * @returns {boolean} True if the car was successfully removed, false if the car was not found.
     */
    removeCar(car) {
        const slotIndex = this.slots.findIndex(slot => slot === car);
        if (slotIndex === -1) return false;
        
        this.slots[slotIndex] = null;
        this.availableCount++;
        return true;
    }

    /**
     * Retrieves the number of available parking slots.
     * @returns {number} The number of available slots.
     */
    getAvailableSlots() {
        return this.availableCount;
    }

    /**
     * Checks if the parking lot is full.
     * @returns {boolean} True if the parking lot is full, false otherwise.
     */
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

/**
 * Calculates the factorial of a non-negative integer recursively.
 * @param {number} n - A non-negative integer whose factorial is to be calculated.
 * @returns {number|string} The factorial of the given number or an error message for negative inputs.
 */
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