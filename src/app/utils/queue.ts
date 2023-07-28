export class Queue<T> {
  private _store: T[];

  constructor(data: T[] = []) {
    this._store = data;
  }

  public push(val: T) {
    this._store.push(val);
  }
  public pop(): T | undefined {
    return this._store.shift();
  }

  public clear(): void {
    this._store = [];
  }

  public isEmpty(): boolean {
    return this._store.length === 0;
  }

  public size(): number {
    return this._store.length;
  }
  public peek(): T | undefined {
    return this._store[0];
  }
}
