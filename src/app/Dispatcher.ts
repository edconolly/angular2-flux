declare var require;
import {Hero} from './HeroesStore'
import {HeroActionType} from './HeroActions'
var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
var {Subject} = Rx;

export interface DispatchPayload {
	type: HeroActionType
	notification: Hero
}

export class Dispatcher {
	public observable: Rx.Subject<DispatchPayload>;
	public subscribe;
	
	constructor() {
		this.observable = new Subject()
		this.subscribe = this.observable.subscribe.bind(this.observable);
	}
	
	dispatch(payload: DispatchPayload) {
		this.observable.next(payload)
	}
}