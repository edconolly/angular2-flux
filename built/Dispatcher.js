var Rx = require('@reactivex/rxjs/dist/cjs/Rx');
var Observable = Rx.Observable;
var Dispatcher = (function () {
    function Dispatcher() {
        var _this = this;
        return new Observable(function (observer) {
            _this.register(function (payload) { return observer.next(payload); });
        });
    }
    Dispatcher.prototype.dispatch = function (payload) {
        this.callBacks.forEach(function (callBack) { return callBack(payload); });
    };
    Dispatcher.prototype.register = function (callBack) {
        this.callBacks.push(callBack);
    };
    return Dispatcher;
})();
exports.Dispatcher = Dispatcher;
