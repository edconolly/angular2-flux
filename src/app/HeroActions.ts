import {bootstrap, Injectable} from 'angular2/angular2'
import {Hero} from './HeroesStore'
import {Dispatcher} from './Dispatcher'

export enum HeroActionType {
	Update,
	Delete,
	Create,
	Fetch
}

@Injectable()
export class HeroActions {
	constructor(private dispatcher: Dispatcher) {};
	
	updateHero(hero: Hero) {
		// Do some http request to save the data.
		// myservice.makeHttpRequestToSaveData().subscribe .etc.;
		
		// At the same time, update the local store.
		this.dispatcher.dispatch({
			type: HeroActionType.Update,
			notification: hero
		});
	}
}