
// Function to return an array of chat objects
export function returnChats(obj) {
  const arr = [];
  Object.keys(obj).forEach((key) => {
    arr.push({
      id: obj[key].id,
      question: obj[key].question,
      response: obj[key].response,
      timeStamp: obj[key].timeStamp,
    });
  });
  return arr;
}

// Function to return an array of task chat objects
export function returnTaskChats(obj) {
  const arr = [];
  Object.keys(obj).forEach((key) => {
    arr.push({
      id: obj[key].id,
      question: obj[key].question,
      response: obj[key].response,
      taskCreated: obj[key].taskCreated,
    });
  });
  return arr;
}

// Function to extract the city name from a string
export function returnCity(str) {
  const match = str.match(/"([^"]*)"/) || [];
  return match[1] || null;
}

// Function to return an array of weather details
export function returnWeatherDetails(object) {
  const arr = [];
  for (const key in object) {
    if (object[key] && object[key] !== 0) {
      arr.push({
        key,
        value: object[key],
      });
    }
  }
  return arr;
}
