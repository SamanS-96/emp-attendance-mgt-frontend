import { Routes } from '@angular/router';
import { Employee } from './pages/employee/employee';
import { EmployeeAdd } from './pages/employee-add/employee-add';
import { Department } from './pages/department/department';
import { DepartmentAdd } from './pages/department-add/department-add';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full'
  },

  {
    path: 'employee',
    component: Employee
  },
  {
    path: 'employee-add',
    component: EmployeeAdd
  },
  {
    path:'employee-edit/:id',
    component: EmployeeAdd
  },

  {
    path: 'department',
    component: Department
  },
  {
    path: 'department-add',
    component: DepartmentAdd
  },
  {
    path:'department-edit/:id',
    component: DepartmentAdd
  }
];