
// Function to return an array of chat objects
export function returnChats(obj) {
  // Create an empty array to store chat objects
  const chats = [];

  // Iterate over the keys of the input object
  Object.keys(obj).forEach((key) => {
    // Push a new chat object to the chats array
    chats.push({
      id: obj[key].id,
      question: obj[key].question,
      response: obj[key].response,
      timeStamp: obj[key].timeStamp,
    });
  });

  // Return the chats array
  return chats;
}

// Function to return an array of task chat objects
export function returnTaskChats(obj) {
  // Create an empty array to store task chat objects
  const taskChats = [];

  // Iterate over the keys of the input object
  Object.keys(obj).forEach((key) => {
    // Push a new task chat object to the taskChats array
    taskChats.push({
      id: obj[key].id,
      question: obj[key].question,
      response: obj[key].response,
      taskCreated: obj[key].taskCreated,
    });
  });

  // Return the taskChats array
  return taskChats;
}

// Function to extract the city name from a string
export function returnCity(str) {
  // Use regular expression to match the city name enclosed in double quotes
  const match = str.match(/"([^"]*)"/) || [];

  // Return the matched city name or null if no match found
  return match[1] || null;
}

// Function to return an array of weather details
export function returnWeatherDetails(object) {
  // Create an empty array to store weather details
  const weatherDetails = [];

  // Iterate over the keys of the input object
  for (const key in object) {
    // Check if the value is truthy and not equal to 0
    if (object[key] && object[key] !== 0) {
      // Push a new weather detail object to the weatherDetails array
      weatherDetails.push({
        key,
        value: object[key],
      });
    }
  }

  // Return the weatherDetails array
  return weatherDetails;
}
