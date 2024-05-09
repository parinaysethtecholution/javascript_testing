
// Function to return an array of chat objects
export function returnChats(obj) {
  // Initialize an empty array to store chat objects
  const chatArray = [];

  // Iterate over the keys of the input object
  Object.keys(obj).forEach(function(key) {
    // Push a new chat object to the array
    chatArray.push({
      "id": obj[key].id,
      "question": obj[key].question,
      "response": obj[key].response,
      "timeStamp": obj[key].timeStamp
    });
  });

  // Return the array of chat objects
  return chatArray;
}

// Function to return an array of task chat objects
export function returnTaskChats(obj) {
  // Initialize an empty array to store task chat objects
  const taskChatArray = [];

  // Iterate over the keys of the input object
  Object.keys(obj).forEach(function(key) {
    // Push a new task chat object to the array
    taskChatArray.push({
      "id": obj[key].id,
      "question": obj[key].question,
      "response": obj[key].response,
      "taskCreated": obj[key].taskCreated
    });
  });

  // Return the array of task chat objects
  return taskChatArray;
}

// Function to extract the city name from a string
export function returnCity(str) {
  // Use a regular expression to match the city name enclosed in double quotes
  const match = str.match(/"([^"]*)"/) || [];

  // Return the matched city name or null if no match is found
  return match[1] || null;
}

// Function to return an array of weather detail objects
export function returnWeatherDetails(object) {
  // Initialize an empty array to store weather detail objects
  const weatherDetailsArray = [];

  // Iterate over the keys of the input object
  for (const key in object) {
    // Check if the value is truthy and not equal to 0
    if (object[key] && object[key] !== 0) {
      // Push a new weather detail object to the array
      weatherDetailsArray.push({
        key: key,
        value: object[key]
      });
    }
  }

  // Return the array of weather detail objects
  return weatherDetailsArray;
}
