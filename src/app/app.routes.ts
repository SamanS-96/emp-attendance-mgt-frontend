import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employee } from './pages/employee/employee';
import { EmployeeAdd } from './pages/employee-add/employee-add';
import { Department } from './pages/department/department';
import { DepartmentAdd } from './pages/department-add/department-add';
import { LeaveRequest } from './pages/leave-request/leave-request';
import { LeaveRequestAdd } from './pages/leave-request-add/leave-request-add';
import { Attendance } from './pages/attendance/attendance';
import { Login } from './pages/login/login';
import { MyAttendance } from './pages/my-attendance/my-attendance';
import { MyLeaves } from './pages/my-leaves/my-leaves';
import { MainLayout } from './layout/main-layout/main-layout';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: Dashboard
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
        path: 'employee-edit/:id',
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
        path: 'department-edit/:id',
        component: DepartmentAdd
      },

      {
        path: 'leave-request',
        component: LeaveRequest
      },
      {
        path: 'leave-request-add',
        component: LeaveRequestAdd
      },
      {
        path: 'leave-request-edit/:id',
        component: LeaveRequestAdd
      },

      {
        path: 'attendance',
        component: Attendance
      },


      {
        path: 'my-attendance',
        component: MyAttendance
      },
      {
        path: 'my-leaves',
        component: MyLeaves
      }
    ]
  },

];