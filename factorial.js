/**
 * Calculates the factorial of a number iteratively.
 * @param {number} n - The number to calculate the factorial of.
 * @returns {number|string} The factorial of the number, or a message if the input is negative.
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
     * Creates a parking lot with a specified size.
     * @param {number} size - The total number of slots in the parking lot.
     */
    constructor(size) {
        this.slots = new Array(size).fill(null);
        this.availableCount = size;
    }

    /**
     * Parks a car in the first available slot.
     * @param {string} car - The identifier for the car.
     * @returns {boolean} True if the car was parked, false if the parking lot was full.
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
     * @param {string} car - The identifier for the car to remove.
     * @returns {boolean} True if the car was removed, false if the car was not found.
     */
    removeCar(car) {
        const slotIndex = this.slots.findIndex(slot => slot === car);
        if (slotIndex === -1) return false;

        this.slots[slotIndex] = null;
        this.availableCount++;
        return true;
    }

    /**
     * Retrieves the number of available slots in the parking lot.
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
 * Calculates the factorial of a number recursively.
 * @param {number} n - The number to calculate the factorial of.
 * @returns {number|string} The factorial of the number, or a message if the input is negative.
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