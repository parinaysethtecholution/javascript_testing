
// Function to return an array of chat objects
export function returnChats(obj) {
  const chats = [];

  // Iterate over the keys of the input object
  Object.keys(obj).forEach(key => {
    const chat = obj[key];
    chats.push({
      id: chat.id,
      question: chat.question,
      response: chat.response,
      timeStamp: chat.timeStamp
    });
  });

  return chats;
}

// Function to return an array of task chat objects
export function returnTaskChats(obj) {
  const taskChats = [];

  // Iterate over the keys of the input object
  Object.keys(obj).forEach(key => {
    const taskChat = obj[key];
    taskChats.push({
      id: taskChat.id,
      question: taskChat.question,
      response: taskChat.response,
      taskCreated: taskChat.taskCreated
    });
  });

  return taskChats;
}

// Function to extract the city name from a string
export function returnCity(str) {
  const match = str.match(/"([^"]*)"/) // Regular expression to match a quoted string
  return match ? match[1] : null; // Return the matched string or null if no match
}

// Function to return an array of key-value pairs from an object
export function returnWeatherDetails(object) {
  const details = [];

  // Iterate over the keys of the input object
  for (const key in object) {
    const value = object[key];
    if (value && value !== 0) { // Check if the value is truthy and not zero
      details.push({ key, value });
    }
  }

  return details;
}
