import { Employee } from './Employee.js';
import { tag } from './html.js';

const employee = new Employee('Jimmy Jim');

const h1 = tag('h1', employee.describe());
document.body.appendChild(h1);
