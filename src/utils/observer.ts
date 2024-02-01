type Listener = () => void;

class Observer {
  private observers: Listener[] = [];

  subscribe(callback: Listener) {
    this.observers.push(callback);
  }

  notify() {
    this.observers.forEach((observer) => observer());
    console.log('notified');
  }

  unSubscribe(callback: Listener) {
    this.observers = this.observers.filter((observer) => observer !== callback);
  }

  performAction() {
    console.log('Function executed');
    this.notify();
  }
}

export default Observer;

