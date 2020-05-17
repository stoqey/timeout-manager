import { timeoutCollection } from '../src'

const firstTimeoutID = setTimeout(function () {
    console.log('First timeout, after 5 seconds');
}, 5000);

const secondTimeoutID = setTimeout(function () {
    console.log(timeoutCollection.getAll().map(id => id.uuid));
    console.log('second timeout, after 8 seconds');
}, 8000);

console.log(timeoutCollection.get(firstTimeoutID)); //timeout object

// Removing the first timeout
timeoutCollection.remove(firstTimeoutID);

console.log(timeoutCollection.getAll().map(id => id.uuid));

