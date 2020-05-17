import { TimeoutCollection } from './timeout-collection.model';

export const timeoutCollection = new TimeoutCollection();


global.setTimeout = (handler: any, timeout?: any, ...args: any[]): NodeJS.Timeout => {
	return timeoutCollection.add(handler, timeout, args);
};


global.clearTimeout = function (id: NodeJS.Timeout): void {
	timeoutCollection.remove(id);
};