
/**
 * Converts an object into an array of chat objects with specific properties.
 *
 * @param {Object} obj - The object containing chat data.
 * @returns {Array} An array of chat objects with properties: id, question, response, and timeStamp.
 */
export function returnChats(obj) {
    return Object.entries(obj).map(([, chatData]) => ({
        id: chatData.id,
        question: chatData.question,
        response: chatData.response,
        timeStamp: chatData.timeStamp,
    }));
}

/**
 * Converts an object into an array of task chat objects with specific properties.
 *
 * @param {Object} obj - The object containing task chat data.
 * @returns {Array} An array of task chat objects with properties: id, question, response, and taskCreated.
 */
export function returnTaskChats(obj) {
    return Object.entries(obj).map(([, taskChatData]) => ({
        id: taskChatData.id,
        question: taskChatData.question,
        response: taskChatData.response,
        taskCreated: taskChatData.taskCreated,
    }));
}

/**
 * Extracts the city name from a given string.
 *
 * @param {string} str - The input string containing the city name enclosed in double quotes.
 * @returns {string|null} The extracted city name if found, or null if not found.
 */
export function returnCity(str) {
    const match = str.match(/"([^"]*)"/);
    return match ? match[1] : null;
}

/**
 * Converts an object into an array of key-value pairs, excluding keys with falsy values (except 0).
 *
 * @param {Object} object - The input object.
 * @returns {Array} An array of key-value pair objects.
 */
export function returnWeatherDetails(object) {
    return Object.entries(object)
        .filter(([, value]) => value || value === 0)
        .map(([key, value]) => ({ key, value }));
}
