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
(function (HeroActionType) {
    HeroActionType[HeroActionType["Update"] = 0] = "Update";
    HeroActionType[HeroActionType["Delete"] = 1] = "Delete";
    HeroActionType[HeroActionType["Create"] = 2] = "Create";
    HeroActionType[HeroActionType["Fetch"] = 3] = "Fetch";
})(exports.HeroActionType || (exports.HeroActionType = {}));
var HeroActionType = exports.HeroActionType;
var HeroActions = (function () {
    function HeroActions(dispatcher) {
        this.dispatcher = dispatcher;
    }
    ;
    HeroActions.prototype.updateHero = function (hero) {
        // Do some http request to save the data.
        // At the same time, update the local store.
        this.dispatcher.dispatch({
            type: HeroActionType.Update,
            notification: hero
        });
    };
    HeroActions = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [Dispatcher_1.Dispatcher])
    ], HeroActions);
    return HeroActions;
})();
exports.HeroActions = HeroActions;
