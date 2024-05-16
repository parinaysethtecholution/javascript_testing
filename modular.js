
export function returnWeatherDetails(object) {
    // Refactored the returnWeatherDetails function to improve readability and maintainability
    let weatherDetails = [];
    for (let key in object) {
        if (object[key] && object[key] !== 0) {
            weatherDetails.push({
                key: key,
                value: object[key]
            });
        }
    }
    return weatherDetails;
}

class ParkingLot {
    constructor(size) {
        // Initialize the parking lot with the given size
        this.slots = new Array(size).fill(null);
        this.availableCount = size;
    }

    parkCar(car) {
        // Park a car in the first available slot
        if (this.availableCount === 0) return false;
        const emptySlot = this.slots.findIndex(slot => slot === null);
        this.slots[emptySlot] = car;
        this.availableCount--;
        return true;
    }

    removeCar(car) {
        // Remove a car from the parking lot
        const slotIndex = this.slots.findIndex(slot => slot === car);
        if (slotIndex === -1) return false;
        this.slots[slotIndex] = null;
        this.availableCount++;
        return true;
    }

    getAvailableSlots() {
        // Get the number of available slots in the parking lot
        return this.availableCount;
    }

    isFull() {
        // Check if the parking lot is full
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
