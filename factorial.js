/**
 * Calculates the factorial of a number iteratively.
 * @param {number} n - The number to calculate the factorial of.
 * @returns {number|string} The factorial of the number, or an error message for negative inputs.
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
 * Class representing a parking lot with a fixed number of slots.
 */
class ParkingLot {
    /**
     * Initializes a new instance of the ParkingLot class with the specified size.
     * @param {number} size - The total number of parking slots in the lot.
     */
    constructor(size) {
        this.slots = new Array(size).fill(null);
        this.availableCount = size;
    }

    /**
     * Attempts to park a car in the first available slot.
     * @param {string} car - The license plate or identifier of the car.
     * @returns {boolean} Indicates whether the car was successfully parked.
     */
    parkCar(car) {
        if (this.availableCount === 0) return false;

        const emptySlot = this.slots.findIndex(slot => slot === null);
        this.slots[emptySlot] = car;
        this.availableCount--;
        return true;
    }

    /**
     * Attempts to remove a car from the parking lot.
     * @param {string} car - The license plate or identifier of the car to remove.
     * @returns {boolean} Indicates whether the car was successfully removed.
     */
    removeCar(car) {
        const slotIndex = this.slots.findIndex(slot => slot === car);
        if (slotIndex === -1) return false;

        this.slots[slotIndex] = null;
        this.availableCount++;
        return true;
    }

    /**
     * Gets the number of available parking slots.
     * @returns {number} The count of available slots in the parking lot.
     */
    getAvailableSlots() {
        return this.availableCount;
    }

    /**
     * Determines if the parking lot is currently full.
     * @returns {boolean} Indicates whether the parking lot is full.
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
 * @returns {number|string} The factorial of the number, or an error message for negative inputs.
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