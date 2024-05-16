
function factorialIterative(n) {
    // Check if the input is a negative number
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }
    
    let result = 1;
    // Iterate from 1 to n and multiply the result
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log(factorialIterative(5)); // Output: 120

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
        // Find the slot index of the car
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

function factorialRecursive(n) {
    // Check if the input is a negative number
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }
    
    // Base case: factorial of 0 or 1 is 1
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Recursive case: n! = n * (n-1)!
    return n * factorialRecursive(n - 1);
}

console.log(factorialRecursive(5)); // Output: 120
