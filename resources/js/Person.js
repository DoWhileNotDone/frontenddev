export class Person {
    constructor(name) {
        this._name = name;
    }
    describe() {
        return 'Person called '+this.name;
    }
    get name() {
      return this._name;
    }
    set name(name = '') {
      this._name = name;
    }
}
