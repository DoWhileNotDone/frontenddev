import { Person } from './Person.js';

export class Employee extends Person {
    constructor(name, role='grunt') {
        super(name);
        this._role = role;
    }
    describe() {
        return `${super.describe()} (${this.role})`;
    }
    get role() {
      return this._role;
    }
    set role(role = '') {
      this._role = role;
    }
}
