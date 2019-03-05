export class Person {
    constructor(public _name: string) {
    }
    describe(): string {
        return `Person called ${this.name}`;
    }
    get name(): string {
      return this._name;
    }
    set name(name: string) {
      this._name = name;
    }
}
