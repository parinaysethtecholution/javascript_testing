refactored
// Function to return an array of chat objects
export function returnChats(obj) {
  const chats = Object.keys(obj).map((key) => ({
    id: obj[key].id,
    question: obj[key].question,
    response: obj[key].response,
    timeStamp: obj[key].timeStamp,
  }));
  return chats;
}

// Function to return an array of task chat objects
export function returnTaskChats(obj) {
  const taskChats = Object.keys(obj).map((key) => ({
    id: obj[key].id,
    question: obj[key].question,
    response: obj[key].response,
    taskCreated: obj[key].taskCreated,
  }));
  return taskChats;
}

// Function to extract the city name from a string
export function returnCity(str) {
  const match = str.match(/"([^"]*)"/) || [];
  return match[1] || null;
}

// Function to return an array of weather details
export function returnWeatherDetails(object) {
  return Object.entries(object)
    .filter(([_, value]) => value && value !== 0)
    .map(([key, value]) => ({ key, value }));
}