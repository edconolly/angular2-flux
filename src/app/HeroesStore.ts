declare var require;
import {Injectable} from 'angular2/angular2'
import {Dispatcher, DispatchPayload} from './Dispatcher'
import {HeroActionType} from './HeroActions'
var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
var {Observable} = Rx;

@Injectable()
export class HeroesStore {  
    dispatcher: Dispatcher
    observable: Rx.Observable<Hero[]>;
    private notify: () => void;
    
    constructor(dispatcher: Dispatcher) {
        
        // Let the heroes store be observable.
        this.observable = new Observable(observer => {
            this.notify = () => observer.next(this.heroes);    
            observer.next(this.heroes);
        });
        
        // Register with the dispatcher and run update when the update event is fired.
        dispatcher.observable.
            filter(payload => payload.type === HeroActionType.Update).
            subscribe((payload: DispatchPayload) => this.updateHeroes(payload.notification));
    };
    
    private updateHeroes(hero: Hero) {
        this.heroes = this.heroes.map(current => {
            return current.id == hero.id ? hero : current;
        });
        this.notify();
    }
    
    private heroes: Hero[] = [
        { "id": 11, "name": "Mr. Nice Foo Bar" },
        { "id": 12, "name": "Narco" },
        { "id": 13, "name": "Bombasto" },
        { "id": 14, "name": "Celertas" },
        { "id": 15, "name": "Magneta" },
        { "id": 16, "name": "RubberMan" },
        { "id": 17, "name": "Dynama" },
        { "id": 18, "name": "Dr IQ" },
        { "id": 19, "name": "Magma" },
        { "id": 20, "name": "Tornado" }
    ];
}

export class Hero {
    constructor(public id: number, public name: string) {};
}