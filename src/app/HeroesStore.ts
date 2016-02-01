import {Injectable} from 'angular2/angular2'
import {Dispatcher, DispatchPayload} from './Dispatcher'
import {HeroActionType} from './HeroActions'
var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable, Subject} = Rx;

@Injectable()
export class HeroesStore {
    private dispatcher: Dispatcher;
    private observable: Rx.Subject<Hero[]>;
    public subscribe; 
    
    constructor(dispatcher: Dispatcher) {

        this.observable = new Subject()
        this.subscribe = this.observable.subscribe.bind(this.observable);

        // Register with the dispatcher and run update when the update event is fired.
        dispatcher.observable.
            filter(payload => payload.type === HeroActionType.Update).
            subscribe((payload: DispatchPayload) => {
                const updatedHeroes = this.updateHeroes(payload.notification, this._state);
                this.state = updatedHeroes;
                
                this.observable.next(updatedHeroes)
            });
    }
    
    private updateHeroes(hero: Hero, heroes: Hero[]): Hero[] {
        return heroes.map(current => {
            return current.id == hero.id ? hero : current;
        });
    }
    
    public get state(): Hero[] {
        return this._state;
    }

    public set state(heroes: Hero[]) {
        this._state = heroes;
    }
    
    private _state: Hero[] = [
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