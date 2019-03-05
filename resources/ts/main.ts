import { Employee } from './Employee';
import { tag } from './html';

const employee = new Employee('Jimmy Jim');

const h1 = tag('h1', employee.describe());
document.body.appendChild(h1);
