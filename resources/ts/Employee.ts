import { Person } from './Person.js';

export class Employee extends Person {
    constructor(name: string, public _role: string = 'grunt') {
        super(name);
    }
    describe() {
        return `${super.describe()} (${this.role})`;
    }
    get role(): string {
      return this._role;
    }
    set role(role: string) {
      this._role = role;
    }
}
