
// Function to return an array of chat objects
export function returnChats(obj) {
  const chats = [];

  // Iterate over the object keys
  Object.keys(obj).forEach((key) => {
    const chat = obj[key];
    chats.push({
      id: chat.id,
      question: chat.question,
      response: chat.response,
      timeStamp: chat.timeStamp,
    });
  });

  return chats;
}

// Function to return an array of task chat objects
export function returnTaskChats(obj) {
  const taskChats = [];

  // Iterate over the object keys
  Object.keys(obj).forEach((key) => {
    const taskChat = obj[key];
    taskChats.push({
      id: taskChat.id,
      question: taskChat.question,
      response: taskChat.response,
      taskCreated: taskChat.taskCreated,
    });
  });

  return taskChats;
}

// Function to extract the city name from a string
export function returnCity(str) {
  const match = str.match(/"([^"]*)"/) || [];
  return match[1] || null;
}

// Function to return an array of weather detail objects
export function returnWeatherDetails(object) {
  const weatherDetails = [];

  // Iterate over the object keys
  for (const key in object) {
    const value = object[key];
    if (value !== 0) {
      weatherDetails.push({ key, value });
    }
  }

  return weatherDetails;
}
