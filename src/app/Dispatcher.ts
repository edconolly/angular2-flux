declare var require;
import {Hero} from './HeroesStore'
import {HeroActionType} from './HeroActions'
var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
var {Observable} = Rx;

export interface DispatchPayload {
	type: HeroActionType
	notification: Hero
}

interface DispatchCallBack {
	(x: DispatchPayload): void
}

export class Dispatcher {
	public observable: Rx.Observable<DispatchPayload>;
	private notify: (payload: DispatchPayload) => void;
	
	constructor() {
		this.observable = new Observable(observer => {
			this.notify = payload => observer.next(payload); 
		});
	}
	
	dispatch(payload: DispatchPayload) {
		this.notify ? this.notify(payload) : console.log('no subscribers for dispatch observable');
	}
}