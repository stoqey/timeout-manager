import { IntervalCollection } from './interval-collection.model';

export const intervalCollection = new IntervalCollection();

global.setInterval = (handler: any, interval?: number, ...args: any[]) => {
	return intervalCollection.add(handler, interval, args);
};

global.clearInterval = function (id: NodeJS.Timeout): void {
	intervalCollection.remove(id);
};