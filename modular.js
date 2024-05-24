
export function returnBogus(object) {
    let arr = []; // Initialize an empty array
    for(let key in object) { // Iterate over each key in the object
        console.log("This is Bogus"); // Log a message to the console
    }
}
