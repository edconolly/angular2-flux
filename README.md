Angular2: Flux and Observable Example
=====================================

This example shows how to implement the flux pattern in Angular 2 using observables.

In particular it conveys the following key concepts:
- Views only generate actions, and are not two way data bound to data models.
- Actions use a dispatcher to centralise the distribution of events.
- Data stores subscribe to the dispatcher and update themselves when relevant events are raised.
- Views subscribe to changes in the data store and update when the stores update.
- The pub / sub model for the dispatcher and data stores are implemented using RxJS observables.

Getting Started
---------------
Make sure you have the typescript compiler installed (`npm install -g tsc`).

Install all the dependencies with 
```
npm install
```

Then, in one window run the compiler in watch mode on the `src/` directory.
```
tsc -p src -w
```

In another window start the app with
```
npm start
```

App Overview
---------------

We're starting with the tour of heroes app from the [Angular tutorial] (https://angular.io/docs/ts/latest/tutorial/). We want to implement the same functionility but
this time we're going to use the flux pattern to achieve unidirectional data flow, which will make our app easier to reason about and maintain.

In a traditional Angular application we tend to store data right in $scope, it gets updated straight from the view, and the view changes when changes are made to it.
It seems pretty great when you're building simple apps how fast you can throw together views and data,
but when you start to share data across multiple scopes things can get a little more complex.
Understanding how user interactions translate into data changes can become convoluted and similarly understanding how data changes are reflected in views can end up the same. 

Let's start by looking at a Flux diagram to understand the pattern at a high level.

![Flux diagram](https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png)  

We can see from the diagram a brief description of each of the key elements of the flow, but let's dive a little deeper using this repo as an example.

We start by implementing a `updateHero` method on our main component's view controller. This is the method the form will call once a user has selected a hero, filled in a new name and clicked submit.
In a normal Angular app this would update a list of heroes that exists on the controller, but here we're going to create a new action, more specifically the `updateHero` action on the `heroesAction` object, this is injected into our component class.

Without Flux (update this.heroes, our hero data model straight on the view-model)
```
updateHero(event, newName) {
	event.preventDefault();
	this.heroes.map(hero => hero.id === selectedHero.id ? new Hero(hero.id, newName.value) : hero);
}
```

With Flux (create an updateHero action)
src/app/app.ts:64
```
updateHero(event, newName) {
	event.preventDefault();
	this.heroActions.updateHero(
		new Hero(this.selectedHero.id, this.newName.value)
	);
}
```

In our flux example we don't manipulate our data model directly, instead we decouple the user interaction from our data model and simply provide the relevant data for the action.

Our action object, `HeroActions`, performs any of our data access (http, web socket, local storage .etc.) and notifies a dispatcher (another injected object) when certain things need to happen.
In our example we don't have any network connectivity so we simply immediately notify the dispatcher to publish an `HeroActionType.Update` event.
We could have similarly here published a `HeroActionType.Loading` event and a `HeroActionType.Update` once loading was complete.

src/app/HeroActions.ts:16
```
updateHero(hero: Hero) {
	// Do some http request to save the data.
	// myservice.makeHttpRequestToSaveData().subscribe .etc.;
	
	this.dispatcher.dispatch({
		type: HeroActionType.Update,
		notification: hero
	});
}
```

The dispatcher, implements a publish / subscribe pattern, so data stores can register themselves as interested in certain types of events.
In this app we're using observerables to implement that pattern. Observerables are objects with a `subscribe` method, which takes 3 arguments for `next`, `error` and `complete` cases, similar to promises `success` and `error` callbacks.
Our dispatcher has a `dispatch` method, which will notify all the subscribers of the dispatcher's observable. Let's take a look at how it works.

src/app/Dispatcher.ts
```
constructor() {
	this.observable = new Observable(observer => {
		this.notify = payload => observer.next(payload); 
	});
}

dispatch(payload: DispatchPayload) {
	this.notify ? this.notify(payload) : console.log('no subscribers for dispatch observable');
}
```

So actions objects call the dispatcher, which in turn will notify all of the dispatchers subscribers, that is any object which has implemented the subscribe method on the dispatchers observable `dispatcher.observable.subscribe(function next() { .. })`.

In our example we have the `HeroesStore` which holds our data model for our heroes and subscribers to the dispatcher. It only listens to `update` events by using the `filter` operator avaible on Rx's observables. When the dispatcher raises the events the store is interested in the store is responsible for mutating it's data.

We see below how the `HeroesStore` subscribes to dispatcher, when an event of the right type is raised we call `this.updateHeroes(payload.notification)`, the method responsible for changing the data in our data model, `this.heroes`.
src/app/HeroesStore.ts:23
```
dispatcher.observable.
	filter(payload => payload.type === HeroActionType.Update).
	subscribe((payload: DispatchPayload) => this.updateHeroes(payload.notification));
``` 

We close the loop now by having our view controller subscribe to changes on the data model, first by making the data model `HeroesStore` and observable, and then calling `subscribe` in the view controller and assigning our view-model to the data model in `HeroesStore`.

src/app/HeroesStore.ts:17
```
this.observable = new Observable(observer => {
	this.notify = () => observer.next(this.heroes);    
	observer.next(this.heroes);
});
```

src/app/app.ts:51
```
constructor(heroesStore: HeroesStore, private heroActions: HeroActions) {
	heroesStore.observable.subscribe(x => this.heroes = x);
};
```

So when any data changes occur within `HeroesStore`, `this.notify()` is called which in turn will update our view-model.

Conclusion
-----------
We've shown how flux pattern can help us seperate our concerns and centralise data models away from the view controllers, making our app easier to reason about and more flexible to change.
Additionally using an implementation of observables we're able to react to events from a dispatcher and to changes in our data model.  
