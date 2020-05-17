import { originalClearTimeout, originalSetTimeout } from '../overrides/override'
import { TimeoutStatus } from './timeout-status.model';
import { TimeoutModel } from './timeout.model';

export class TimeoutCollection {
	private _timeoutCollection: TimeoutModel[] = [];

	public add(handler: Function, timeout?: number, ...args: any[]): NodeJS.Timeout {
		let newTimeout = new TimeoutModel(handler, timeout, args);
		let id = originalSetTimeout.apply(global, [this._getWrappedHandler(newTimeout.uuid, handler), timeout, args]);
		newTimeout.id = id;
		this._timeoutCollection.push(newTimeout);
		return id;
	}

	public remove(id: NodeJS.Timeout): void {
		let timeoutIndex = this._getTimeoutIndexById(id);

		if (timeoutIndex !== -1) {
			this._timeoutCollection.splice(timeoutIndex, 1);
		}

		originalClearTimeout.apply(global, [id]);
	}

	public get(timeout: NodeJS.Timeout): TimeoutModel {
		return this._timeoutCollection[(this._getTimeoutIndexById(timeout))];
	}

	public getScheduled(): TimeoutModel[] {
		return this._timeoutCollection.filter((value: TimeoutModel) => {
			return value.status === TimeoutStatus.Scheduled;
		});
	}

	public getCompleted(): TimeoutModel[] {
		return this._timeoutCollection.filter((value: TimeoutModel) => {
			return value.status === TimeoutStatus.Completed;
		});
	}

	public getAll(): TimeoutModel[] {
		return this._timeoutCollection;
	}

	public getByIndex(index: number): TimeoutModel {
		return this._timeoutCollection[index];
	}

	public removeByUuid(uuid: string): void {
		const currentTimeoutIndex = this._getTimeoutIndexByUuid(uuid);
		const currentTimeoutModel = this._timeoutCollection[currentTimeoutIndex];
		if (currentTimeoutModel && currentTimeoutModel.id) {
			this.remove(currentTimeoutModel.id);
		}
		return null;
	}

	public removeAll() {
		this._timeoutCollection.forEach((timeout: TimeoutModel) => {
			originalClearTimeout.apply(global, [timeout.id]);
		});

		this._timeoutCollection = [];
	}

	private _getWrappedHandler(timeoutUuid: string, handler: Function): Function {
		return ((...args: any[]) => {
			this._timeoutCollection[this._getTimeoutIndexByUuid(timeoutUuid)].status = TimeoutStatus.Completed;

			return handler.apply(global, args);
		});
	}

	private _getTimeoutIndexById(timeoutId: NodeJS.Timeout): number {
		return this._timeoutCollection.findIndex(i => i.id === timeoutId)
	}

	private _getTimeoutIndexByUuid(uuid: string): number {
		for (let i = 0; i < this._timeoutCollection.length; i++) {
			if (this._timeoutCollection[i].uuid === uuid) {
				return i;
			}
		}

		return -1;
	}
}
