
export function returnChats(obj) {
    let arr = [];
    Object.keys(obj).forEach(function(elem) {
        arr.push({
            "id": obj[elem].id,
            "question": obj[elem].question,
            "response": obj[elem].response,
            "timeStamp": obj[elem].timeStamp
        });
    });
    return arr;
}

export function returnTaskChats(obj) {
    let arr = [];
    Object.keys(obj).forEach(function(elem) {
        arr.push({
            "id": obj[elem].id,
            "question": obj[elem].question,
            "response": obj[elem].response,
            "taskCreated": obj[elem].taskCreated
        });
    });
    return arr;
}

export function returnCity(str) {
    const match = str.match(/"([^"]*)"/);
    return match ? match[1] : null;
}

export function returnWeatherDetails(object) {
    let arr = [];
    for (let key in object) {
        if (object[key] && object[key] !== 0) {
            arr.push({
                key: key,
                value: object[key]
            });
        }
    }
    return arr;
}

// ParkingLot class to manage parking slots
class ParkingLot {
    // constructor to initialize slots and available count
    constructor(size) {
        this.slots = new Array(size).fill(null);
        this.availableCount = size;
    }
    // method to park a car
    parkCar(car) {
        if (this.availableCount === 0) return false; // if no slots available, return false
        const emptySlot = this.slots.findIndex(slot => slot === null); // find an empty slot
        this.slots[emptySlot] = car; // park the car in the empty slot
        this.availableCount--; // decrease the available count
        return true; // return true indicating successful parking
    }
    // method to remove a car
    removeCar(car) {
        const slotIndex = this.slots.findIndex(slot => slot === car); // find the slot of the car
        if (slotIndex === -1) return false; // if car not found, return false
        this.slots[slotIndex] = null; // remove the car from the slot
        this.availableCount++; // increase the available count
        return true; // return true indicating successful removal
    }
    // method to get the number of available slots
    getAvailableSlots() {
        return this.availableCount;
    }
    // method to check if the parking lot is full
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
