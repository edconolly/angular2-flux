var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var http_1 = require('angular2/http');
var Heroes_1 = require('./Heroes');
var HeroActions_1 = require('./HeroActions');
var Dispatcher_1 = require('./Dispatcher');
var AppComponent = (function () {
    function AppComponent(heroesStore, heroActions) {
        var _this = this;
        this.heroActions = heroActions;
        this.title = 'Tour of Heroes';
        this.newName = new angular2_1.Control('', angular2_1.Validators.required);
        heroesStore.observable.subscribe(function (x) { return _this.heroes = x; });
    }
    ;
    AppComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
        this.newName.updateValue(hero.name);
    };
    AppComponent.prototype.getSelectedClass = function (hero) {
        return { 'selected': hero === this.selectedHero };
    };
    AppComponent.prototype.submit = function (event) {
        event.preventDefault();
        this.heroActions.updateHero(new Heroes_1.Hero(this.selectedHero.id, this.newName.value));
    };
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app',
            directives: [angular2_1.FORM_DIRECTIVES, angular2_1.NgFor, angular2_1.NgIf, angular2_1.NgClass],
            styles: ["\n      .heroes {list-style-type: none; margin-left: 1em; padding: 0; width: 10em;}\n      .heroes li { cursor: pointer; position: relative; left: 0; transition: all 0.2s ease; }\n      .heroes li:hover {color: #369; background-color: #EEE; left: .2em;}\n      .heroes .badge {\n        font-size: small;\n        color: white;\n        padding: 0.1em 0.7em;\n        background-color: #369;\n        line-height: 1em;\n        position: relative;\n        left: -1px;\n        top: -1px;\n      }\n      .selected { background-color: #EEE; color: #369; }\n  "],
            template: "\n    <h1>{{title}}</h1>\n    <ul class=\"heroes\">\n        <li *ng-for=\"#hero of heroes\" (click)=\"onSelect(hero)\" [ng-class]=\"getSelectedClass(hero)\">\n            <span class=\"badge\">{{hero.id}}</span>{{hero.name}}\n        </li>\n    </ul>\n    <div *ng-if=\"selectedHero\">\n        <form (submit)=\"submit($event)\">\n            <div><label>id: </label>{{selectedHero.id}}</div>\n            <div><label>name: </label>\n            <div><input type=\"text\" placeholder=\"name\" [ng-form-control]=\"newName\"></div>\n            <p *ng-if=\"newName.hasError('required')\">What the fuuuck!</p>\n            <button type=\"submit\">Submit</button>\n        </form>\n        <h2>{{selectedHero.name}} details!</h2>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [Heroes_1.HeroesStore, HeroActions_1.HeroActions])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent, [http_1.HTTP_PROVIDERS, Heroes_1.HeroesStore, HeroActions_1.HeroActions, Dispatcher_1.Dispatcher]);
