export enum IntervalStatus {
    Running,
    Completed
}

export class IntervalModel {

    uuid: string;
    handler: Function;
    interval: number;
    arguments: any[];
    id: NodeJS.Timeout;
    timestamp: number;
    status: IntervalStatus;

    constructor(handler: Function, interval: number, ...args: any[]) {
        this.uuid = this._generateUuid();
        this.handler = handler;
        this.interval = interval;
        this.arguments = args;
        this.id = null;
        this.timestamp = Date.now();
        this.status = IntervalStatus.Running;
    }

    private _generateUuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
