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
class ParkingLot {
  constructor(size) {
    this.slots = new Array(size).fill(null);
    this.availableCount = size;
  }

  parkCar(car) {
    if (this.availableCount === 0) return false;
    const emptySlot = this.slots.findIndex(slot => slot === null);
    this.slots[emptySlot] = car;
    this.availableCount--;
    return true;
  }

  removeCar(car) {
    const slotIndex = this.slots.findIndex(slot => slot === car);
    if (slotIndex === -1) return false;
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
