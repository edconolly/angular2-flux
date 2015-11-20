declare var require;
import {Injectable} from 'angular2/angular2'
import {Dispatcher, DispatchPayload} from './Dispatcher'
import {HeroActionType} from './HeroActions'
var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
var {Observable} = Rx;

@Injectable()
export class HeroesStore {  
    private dispatcher: Dispatcher;
    private observable: Rx.Observable<Hero[]>;
    private notify: (x: Hero[]) => void;
    public subscribe; 
    
    constructor(dispatcher: Dispatcher) {
        
        // Let the store be observable through subscribe()    
        this.observable = new Observable(observer => {
            this.notify = (heroes) => observer.next(heroes);
        });
       
        this.subscribe = this.observable.subscribe.bind(this.observable);
        
        // Register with the dispatcher and run update when the update event is fired.
        dispatcher.observable.
            filter(payload => payload.type === HeroActionType.Update).
            subscribe((payload: DispatchPayload) => {
                const updatedHeroes = this.updateHeroes(payload.notification, this._state);      
                this.notify(updatedHeroes);
                
                // Save the state
                this.state = updatedHeroes;
            });
    };
    
    private updateHeroes(hero: Hero, heroes: Hero[]): Hero[] {
        return heroes.map(current => {
            return current.id == hero.id ? hero : current;
        });
    }
    
    public get state(): Hero[] {
        return this._state;
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