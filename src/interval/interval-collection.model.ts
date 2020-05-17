import { originalClearInterval, originalSetInterval } from '../overrides/override'
import { IntervalModel, IntervalStatus } from './interval.model';

export class IntervalCollection {
	private _intervalCollection: IntervalModel[] = [];

	public add(handler: Function, interval?: number, ...args: any[]): NodeJS.Timeout {
		let newInterval = new IntervalModel(handler, interval, args);
		let id = originalSetInterval.apply(global, [this._getWrappedHandler(newInterval.uuid, handler), interval, args]);
		newInterval.id = id;
		this._intervalCollection.push(newInterval);
		return id;
	}

	private _getWrappedHandler(intervalUuid: string, handler: Function): Function {
		return ((...args: any[]) => {
			this._intervalCollection[this._getIntervalIndexByUuid(intervalUuid)].status = IntervalStatus.Completed;

			return handler.apply(global, args);
		});
	}

	private _getIntervalIndexByUuid(uuid: string): number {
		for (let i = 0; i < this._intervalCollection.length; i++) {
			if (this._intervalCollection[i].uuid === uuid) {
				return i;
			}
		}

		return -1;
	}

	public remove(id: NodeJS.Timeout): NodeJS.Timeout {
		let intervalIndex = this._getIntervalIndexById(id);

		if (intervalIndex !== -1) {
			this._intervalCollection.splice(intervalIndex, 1);
		}

		return originalClearInterval.apply(global, [id]);
	}

	public get(interval: NodeJS.Timeout): IntervalModel {
		return this._intervalCollection[this._getIntervalIndexById(interval)];
	}

	public getAll(): IntervalModel[] {
		return this._intervalCollection;
	}

	public getByIndex(index: number): IntervalModel {
		return this._intervalCollection[index];
	}

	public removeAll() {
		this._intervalCollection.forEach((interval: IntervalModel) => {
			originalClearInterval.apply(global, [interval.id]);
		});

		this._intervalCollection = [];
	}

	private _getIntervalIndexById(intervalId: NodeJS.Timeout): number {
		for (let i = 0; i < this._intervalCollection.length; i++) {
			if (this._intervalCollection[i].id === intervalId) {
				return i;
			}
		}

		return -1;
	}
}
