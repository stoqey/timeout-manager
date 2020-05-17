import { intervalCollection } from '../src'

const firstInterval = setInterval(function () {
    console.log('First timeout, after 5 seconds');
}, 5000);

const secondInterval = setInterval(function () {
    console.log(intervalCollection.getAll().map(id => id.uuid));
    console.log('second timeout, after 8 seconds');
}, 8000);


const thridInterval = setInterval(function () {
    console.log('Finisher');
    intervalCollection.remove(secondInterval);
    // intervalCollection.remove(thridInterval);
    console.log(intervalCollection.getAll().map(id => id.uuid));
}, 10000);

console.log(intervalCollection.get(0)); //timeout object

// Removing the first timeout
clearInterval(firstInterval);

console.log(intervalCollection.getAll().map(id => id.uuid));

