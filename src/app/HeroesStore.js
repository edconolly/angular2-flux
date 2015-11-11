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
var Dispatcher_1 = require('./Dispatcher');
var HeroActions_1 = require('./HeroActions');
var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
var Observable = Rx.Observable;
var HeroesStore = (function () {
    function HeroesStore(dispatcher) {
        var _this = this;
        this.heroes = [
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
        // Let the heroes store be observable.
        this.observable = new Observable(function (observer) {
            _this.notify = function () { return observer.next(_this.heroes); };
            observer.next(_this.heroes);
        });
        // Register with the dispatcher and run update when the update event is fired.
        dispatcher.observable.
            filter(function (payload) { return payload.type === HeroActions_1.HeroActionType.Update; }).
            subscribe(function (payload) {
            _this.heroes = _this.updateHeroes(payload.notification, _this.heroes);
            _this.notify();
        });
    }
    ;
    HeroesStore.prototype.updateHeroes = function (hero, heroes) {
        return this.heroes.map(function (current) {
            return current.id == hero.id ? hero : current;
        });
    };
    HeroesStore = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [Dispatcher_1.Dispatcher])
    ], HeroesStore);
    return HeroesStore;
})();
exports.HeroesStore = HeroesStore;
var Hero = (function () {
    function Hero(id, name) {
        this.id = id;
        this.name = name;
    }
    ;
    return Hero;
})();
exports.Hero = Hero;
//# sourceMappingURL=HeroesStore.js.map