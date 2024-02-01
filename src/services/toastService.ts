export class ToastService {
  toasts: string[] = [];

  add(message: string) {
    this.toasts.push(message);
  }

  remove(index: number) {
    this.toasts.splice(index, 1);
  }
}

