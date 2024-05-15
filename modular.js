
// Function to return an array of chat objects
export function returnChats(obj) {
  // Initialize an empty array to store chat objects
  const arr = [];

  // Iterate over each key in the input object
  Object.keys(obj).forEach((key) => {
    // Push a new chat object to the array
    arr.push({
      id: obj[key].id,
      question: obj[key].question,
      response: obj[key].response,
      timeStamp: obj[key].timeStamp,
    });
  });

  // Return the array of chat objects
  return arr;
}

// Function to return an array of task chat objects
export function returnTaskChats(obj) {
  // Initialize an empty array to store task chat objects
  const arr = [];

  // Iterate over each key in the input object
  Object.keys(obj).forEach((key) => {
    // Push a new task chat object to the array
    arr.push({
      id: obj[key].id,
      question: obj[key].question,
      response: obj[key].response,
      taskCreated: obj[key].taskCreated,
    });
  });

  // Return the array of task chat objects
  return arr;
}

// Function to extract the city name from a string
export function returnCity(str) {
  // Use regular expression to match the city name within double quotes
  const match = str.match(/"([^"]*)"/)
  // Return the matched city name or null if not found
  return match ? match[1] : null;
}

// Function to return an array of weather details
export function returnWeatherDetails(object) {
  // Initialize an empty array to store weather details
  const arr = [];

  // Iterate over each key in the input object
  for (let key in object) {
    // Check if the value is truthy and not equal to 0
    if (object[key] && object[key] !== 0) {
      // Push a new weather detail object to the array
      arr.push({
        key: key,
        value: object[key],
      });
    }
  }

  // Return the array of weather details
  return arr;
}
