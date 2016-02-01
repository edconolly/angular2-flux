import {bootstrap, Component, FORM_DIRECTIVES, NgFor, NgIf, NgClass, Control, Validators, Observable} from 'angular2/angular2'
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http'
import {HeroesStore, Hero} from './HeroesStore'
import {HeroActions} from './HeroActions'
import {Dispatcher} from './Dispatcher'

@Component({
    selector: 'my-app',
    directives: [FORM_DIRECTIVES, NgFor, NgIf, NgClass],
    styles: [`
      .heroes {list-style-type: none; margin-left: 1em; padding: 0; width: 10em;}
      .heroes li { cursor: pointer; position: relative; left: 0; transition: all 0.2s ease; }
      .heroes li:hover {color: #369; background-color: #EEE; left: .2em;}
      .heroes .badge {
        font-size: small;
        color: white;
        padding: 0.1em 0.7em;
        background-color: #369;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -1px;
      }
      .selected { background-color: #EEE; color: #369; }
  `],
    template: `
    <h1>{{title}}</h1>
    <ul class="heroes">
        <li *ng-for="#hero of heroes" (click)="onSelect(hero)" [ng-class]="getSelectedClass(hero)">
            <span class="badge">{{hero.id}}</span>{{hero.name}}
        </li>
    </ul>
    <div *ng-if="selectedHero">
        <form (submit)="updateHero($event, newName)">
            <div><label>id: </label>{{selectedHero.id}}</div>
            <div><label>name: </label>
            <div><input type="text" placeholder="name" [ng-form-control]="newName"></div>
            <p *ng-if="newName.hasError('required')">Name is required</p>
            <button type="submit">Submit</button>
        </form>
        <h2>{{selectedHero.name}} details!</h2>
    </div>
    `
})
export class AppComponent {
    title = 'Tour of Heroes';
    heroes: Hero[];
    selectedHero: Hero;
    newName: Control = new Control('', Validators.required);
    
    constructor(private heroesStore: HeroesStore, private heroActions: HeroActions) {
        this.heroesStore.subscribe(heroes => this.heroes = heroes);
        this.heroes = heroesStore.state;
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
        this.newName.updateValue(hero.name, true);
        this.heroesStore.subscribe(heroes => console.log(heroes))
    }

    getSelectedClass(hero: Hero) {
        return { 'selected': hero === this.selectedHero };
    }
    
    updateHero(event, newName) {
        event.preventDefault();
        this.heroActions.updateHero(
            new Hero(this.selectedHero.id, newName.value)
        );
    }
}

bootstrap(AppComponent, [HTTP_PROVIDERS, HeroesStore, HeroActions, Dispatcher])
