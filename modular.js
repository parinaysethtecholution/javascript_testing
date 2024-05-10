
// Testing unit test generation
import { returnChats, returnTaskChats, returnCity, returnWeatherDetails } from './utils';

// Function to return an array of chat objects
export function returnChats(obj) {
  // Initialize an empty array to store chat objects
  const chats = [];

  // Iterate over the keys of the input object
  Object.keys(obj).forEach(key => {
    // Push a new chat object to the chats array
    chats.push({
      id: obj[key].id,
      question: obj[key].question,
      response: obj[key].response,
      timeStamp: obj[key].timeStamp
    });
  });

  // Return the array of chat objects
  return chats;
}

// Function to return an array of task chat objects
export function returnTaskChats(obj) {
  // Initialize an empty array to store task chat objects
  const taskChats = [];

  // Iterate over the keys of the input object
  Object.keys(obj).forEach(key => {
    // Push a new task chat object to the taskChats array
    taskChats.push({
      id: obj[key].id,
      question: obj[key].question,
      response: obj[key].response,
      taskCreated: obj[key].taskCreated
    });
  });

  // Return the array of task chat objects
  return taskChats;
}

// Function to extract the city name from a given string
export function returnCity(str) {
  // Use a regular expression to match the city name enclosed in double quotes
  const match = str.match(/"([^"]*?)"/);
  // Return the matched city name or null if no match is found
  return match ? match[1] : null;
}

// Function to return an array of weather details
export function returnWeatherDetails(object) {
  // Initialize an empty array to store weather details
  const weatherDetails = [];

  // Iterate over the keys of the input object
  for (const key in object) {
    // Check if the value is truthy and not equal to 0
    if (object[key] && object[key] !== 0) {
      // Push a new weather detail object to the weatherDetails array
      weatherDetails.push({
        key,
        value: object[key]
      });
    }
  }

  // Return the array of weather details
  return weatherDetails;
}
