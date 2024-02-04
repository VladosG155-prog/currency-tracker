type Listener = () => void;

class Observer {
  private observers: Listener[] = [];

  subscribe(callback: Listener) {
    this.observers.push(callback);
  }

  notify() {
    this.observers.forEach((observer) => observer());
  }

  unSubscribe(callback: Listener) {
    this.observers = this.observers.filter((observer) => observer !== callback);
  }
}

export default Observer;

