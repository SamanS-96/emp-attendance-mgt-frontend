import { Routes } from '@angular/router';
import { Employee } from './pages/employee/employee';
import { EmployeeAdd } from './pages/employee-add/employee-add';

export const routes: Routes = [
  {
    path: 'employee',
    component: Employee
  },
  {
    path: 'employee-add',
    component: EmployeeAdd
  }
];