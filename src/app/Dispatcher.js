var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
var Observable = Rx.Observable;
var Dispatcher = (function () {
    function Dispatcher() {
        var _this = this;
        this.observable = new Observable(function (observer) {
            _this.notify = function (payload) { return observer.next(payload); };
        });
    }
    Dispatcher.prototype.dispatch = function (payload) {
        this.notify ? this.notify(payload) : console.log('no subscribers for dispatch observable');
    };
    return Dispatcher;
})();
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=Dispatcher.js.map