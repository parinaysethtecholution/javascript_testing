
// utils.js

/**
 * Converts an object to an array of objects with specific properties.
 * @param {Object} obj - The input object.
 * @returns {Array} An array of objects with properties 'id', 'question', 'response', and 'timeStamp'.
 */
export function returnChats(obj) {
  return Object.values(obj).map(({ id, question, response, timeStamp }) => ({
    id,
    question,
    response,
    timeStamp,
  }));
}

/**
 * Converts an object to an array of objects with specific properties.
 * @param {Object} obj - The input object.
 * @returns {Array} An array of objects with properties 'id', 'question', 'response', and 'taskCreated'.
 */
export function returnTaskChats(obj) {
  return Object.values(obj).map(({ id, question, response, taskCreated }) => ({
    id,
    question,
    response,
    taskCreated,
  }));
}

/**
 * Extracts the city name from a given string.
 * @param {string} str - The input string.
 * @returns {string|null} The city name if found, otherwise null.
 */
export function returnCity(str) {
  const match = str.match(/"([^"]*)"/);
  return match ? match[1] : null;
}

/**
 * Converts an object to an array of objects with 'key' and 'value' properties.
 * @param {Object} object - The input object.
 * @returns {Array} An array of objects with properties 'key' and 'value'.
 */
export function returnWeatherDetails(object) {
  return Object.entries(object)
    .filter(([, value]) => value !== 0)
    .map(([key, value]) => ({ key, value }));
}
