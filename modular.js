
// Function to return an array of chat objects
export function returnChats(obj) {
  const arr = [];

  // Iterate over the keys of the input object
  Object.keys(obj).forEach(function(key) {
    arr.push({
      "id": obj[key].id,
      "question": obj[key].question,
      "response": obj[key].response,
      "timeStamp": obj[key].timeStamp
    });
  });

  return arr;
}

// Function to return an array of task chat objects
export function returnTaskChats(obj) {
  const arr = [];

  // Iterate over the keys of the input object
  Object.keys(obj).forEach(function(key) {
    arr.push({
      "id": obj[key].id,
      "question": obj[key].question,
      "response": obj[key].response,
      "taskCreated": obj[key].taskCreated
    });
  });

  return arr;
}

// Function to extract the city name from a string
export function returnCity(str) {
  const match = str.match(/"([^"]*)"/) // Regular expression to match a quoted string
  return match ? match[1] : null; // Return the matched string or null if no match
}

// Function to return an array of key-value pairs from an object
export function returnWeatherDetails(object) {
  const arr = [];

  // Iterate over the keys of the input object
  for (let key in object) {
    // Check if the value is truthy and not equal to 0
    if (object[key] && object[key] !== 0) {
      arr.push({
        key: key,
        value: object[key]
      });
    }
  }

  return arr;
}
