# timeout-manager
View and Manage NodeJS's timeout and interval as collections

# Installation

```$ yarn add timeout-manager```


# Usage

```ts
import { timeoutCollection } from '@stoqey/timer-manager';

// creating a timeout
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


// Other methods 
timeoutCollection.getScheduled(); //Returns an array of timeout objects that have not yet executed
timeoutCollection.getCompleted(); //Returns an array of timeout objects that have been executed
timeoutCollection.getAll(); //Returns an array of timeout objects

timeoutCollection.removeAll();
```


# Why?

NodeJS will not expose us a simple object or array to view and manage all of our current time-events.
This library exposes the timeouts and intervals in your current node app. In addition, it makes
it possible to manage those time-events on `runtime`.