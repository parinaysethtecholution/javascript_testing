
//test
// This function takes an object as an argument and returns an array of objects.
// Each object in the array represents a chat, with properties for id, question, response, and timestamp.
export function returnChats(obj) {
    let arr = [];
    Object.keys(obj).forEach(function(elem) {
        arr.push({
            "id": obj[elem].id,
            "question": obj[elem].question,
            "response": obj[elem].response,
            "timeStamp": obj[elem].timeStamp
        });
    });
    return arr;
}

export function returnTaskChats(obj) {
    let arr = [];
    Object.keys(obj).forEach(function(elem) {
        arr.push({
            "id": obj[elem].id,
            "question": obj[elem].question,
            "response": obj[elem].response,
            "taskCreated": obj[elem].taskCreated
        });
    });
    return arr;
}

export function returnCity(str) {
    const match = str.match(/"([^"]*)"/);
    return match ? match[1] : null;
}

export function returnWeatherDetails(object) {
    let arr = [];
    for (let key in object) {
        if (object[key] && object[key] !== 0) {
            arr.push({
                key: key,
                value: object[key]
            });
        }
    }
    return arr;
}
