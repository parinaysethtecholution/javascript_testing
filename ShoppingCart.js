
class ParkingLot {
    constructor(size) {
        this.slots = new Array(size).fill(null); // Initialize the parking lot with a specified size
        this.availableCount = size; // Track the number of available slots
    }

    parkCar(car) {
        if (this.availableCount === 0) return false; // If the parking lot is full, return false
        const emptySlot = this.slots.findIndex(slot => slot === null); // Find the first empty slot
        this.slots[emptySlot] = car; // Park the car in the empty slot
        this.availableCount--; // Decrease the available count
        return true; // Return true to indicate that the car was successfully parked
    }

    removeCar(car) {
        const slotIndex = this.slots.findIndex(slot => slot === car); // Find the slot where the car is parked
        if (slotIndex === -1) return false; // If the car is not found, return false
        this.slots[slotIndex] = null; // Remove the car from the slot
        this.availableCount++; // Increase the available count
        return true; // Return true to indicate that the car was successfully removed
    }

    getAvailableSlots() {
        return this.availableCount; // Return the number of available slots
    }

    isFull() {
        return this.availableCount === 0; // Return true if the parking lot is full, false otherwise
    }
}

// Example usage
const lot = new ParkingLot(10); // Create a new parking lot with 10 slots
lot.parkCar("CAR123"); // Park a car with the license plate "CAR123"
lot.parkCar("TRUCK789"); // Park a truck with the license plate "TRUCK789"
console.log(lot.getAvailableSlots()); // Log the number of available slots
console.log(lot.removeCar("TRUCK789")); // Remove the truck from the parking lot
console.log(lot.isFull()); // Check if the parking lot is full
