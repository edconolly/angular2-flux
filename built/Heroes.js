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
var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
var Observable = Rx.Observable;
var HeroesStore = (function () {
    function HeroesStore(dispatcher) {
        var _this = this;
        this.heroes = [
            { "id": 11, "name": "Mr. Nice" },
            { "id": 12, "name": "Narco" },
            { "id": 13, "name": "Bombasto" },
            { "id": 14, "name": "Celeritas" },
            { "id": 15, "name": "Magneta" },
            { "id": 16, "name": "RubberMan" },
            { "id": 17, "name": "Dynama" },
            { "id": 18, "name": "Dr IQ" },
            { "id": 19, "name": "Magma" },
            { "id": 20, "name": "Tornado" }
        ];
        this.observable = new Observable(function (observer) {
            _this.publish = function () {
                observer.next(this.heroes);
            };
        });
        dispatcher.subscribe(function (dispatchPayload) {
            return _this.updateHeroes(dispatchPayload.notfication);
        });
    }
    ;
    HeroesStore.prototype.updateHeroes = function (hero) {
        this.heroes.map(function (current) {
            if (current.id == hero.id)
                return hero;
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
