/**
  * @ADEMMERAL_XTARGET
  * https://github.com/ademmeral/XModules/blob/main/XTarget.js
*/

class XTargetError extends Error{
  constructor(message){
    super(message);
    this.name = 'XTargetError';
    this.message = message;
  }
}

export default class XTarget extends EventTarget {
  constructor(eventClass = CustomEvent) {
    super();
    this.event = this.setEvent(eventClass);
    
  };

  setEvent(eventClass /* Maybe your CustomEventClass */){
    try {

      if ( eventClass.name !== 'CustomEvent' && !(eventClass.prototype instanceof CustomEvent) ) 
        throw new Error(`Provided event class must be built-in CustomEvent or its instance. `);
      this.event = eventClass;
      return this.event;

    } catch (err) {
      if (err instanceof Error)
        throw new XTargetError(err.message);
    }
  };
  emit(name, payload = {}) {
    try {

      const handleDispatch = () =>
        this.dispatchEvent(new this.event(name, { detail: payload }));
      // queueMicrotask(handleDispatch); // maybe some delay
      handleDispatch();
    } catch (err) {
      if (err instanceof Error)
        throw new XTargetError(err.message);
    }
  };
  on(name, callback, options = {}) {
    this.addEventListener(name, callback, options);
  };
  off(name, callback, options = {}){
    this.removeEventListener(name, callback, options);
  };
  once(name, callback, options = { once: true }) {
    this.addEventListener(name, callback, { ...options, once: true });
  };

}; // class end

/* ========= EXAMPLE USAGE ========= */
export const STORY_PLAYER_EVENTS = new XTarget();
export const STORY_SUBMIT_EVENTS = new XTarget();
/*
const cb = (event) => {
  console.log('Event received:', event);
}
target.on('example', cb);           // the event will be attached
target.emit('example');             // the event will be attached
target.off('example', cb)           // the event will be detached
target.on('example');               // won't work :/
*/

/*
target.on('payload', (ev) => console.log(ev.detail))        // { exampleKey : 'exampleValue' }
target.emit('payload', { exampleKey: 'exampleValue' });     // dispatching payload
*/

/*
target.once('example', (event) => {         // The event will run only once
  console.log('Event received:', event);
});

target.emit('example');
target.emit('example');
target.emit('example');
target.emit('example');
      .
      .
      .
*/

// target.setEvent(MyCustomEventClass); // Event name will be changed with yours.

// WITH YOUR OWN CLASS
/*
class MyOwnEmitter extends XTarget{
  // your things go on here... 
}
const myEventEmitter = new MyOwnEmitter();

myEventEmitter.on('example', cb);           // the event will be attached
myEventEmitter.emit('example');             // the event will be attached
myEventEmitter.off('example', cb)           // the event will be detached
*/