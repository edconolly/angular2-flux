declare var require;
import {Hero} from './HeroesStore'
import {HeroActionType} from './HeroActions'
var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
var {Observable} = Rx;

export interface DispatchPayload {
	type: HeroActionType
	notification: Hero
}

export class Dispatcher {
	private notify: (payload: DispatchPayload) => void;
	public observable: Rx.Observable<DispatchPayload>;
	public subscribe;
	
	constructor() {
		this.observable = new Observable(observer => {
			this.notify = payload => observer.next(payload); 
		});
		
		this.subscribe = this.observable.subscribe.bind(this.observable);
	}
	
	dispatch(payload: DispatchPayload) {
		this.notify ? this.notify(payload) : console.log('no subscribers for dispatch observable');
	}
}