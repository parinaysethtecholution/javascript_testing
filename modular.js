
// Function to return an array of chat objects
export function returnChats(obj) {
  const arr = [];
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

// Function to return an array of task chat objects
export function returnTaskChats(obj) {
  const arr = [];
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

// Function to extract city name from a string
export function returnCity(str) {
  const match = str.match(/"([^"]*)"/)
  return match ? match[1] : null;
}

// Function to return an array of key-value pairs from an object
export function returnWeatherDetails(object) {
  const arr = [];
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
