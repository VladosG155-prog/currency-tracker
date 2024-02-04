type IListener = (arg: string) => void;

class Observable {
  observers: IListener[];

  constructor() {
    this.observers = [];
  }

  subscribe(func: IListener) {
    this.observers.push(func);
  }

  unsubscribe(func: IListener) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data: string) {
    this.observers.forEach((observer) => observer(data));
  }
}

export const observable = new Observable();

