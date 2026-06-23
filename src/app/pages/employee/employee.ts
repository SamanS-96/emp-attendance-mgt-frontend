import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [
    MatTableModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {

  searchText: string = '';
  allEmployees: any[] = [];
  employees: any[] = [];
  currentUser: any;

  displayedColumns: string[] = [
    'userName',
    'firstName',
    'lastName',
    'email',
    'phone',
    'departmentName',
    'action'
  ];

  constructor(
    private employeeService: EmployeeService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.loadEmployees();
  }

  addEmployee() {
    this.router.navigate(['/employee-add']);
  }

  editEmployee(id: number) {
    this.router.navigate([
      '/employee-edit',
      id
    ]);
  }

  deactivateEmployee(id: number) {
    if (!confirm("Deactivate this employee?")) {
      return;
    }
    this.employeeService
      .deactivate(id)
      .subscribe({
        next: () => {
          this.loadEmployees();
        }
      });
  }

  loadEmployees() {
    this.employeeService.getAll()
      .subscribe({
        next: (data: any) => {
          console.log("EMP DATA :", data);
          this.allEmployees = data;
          this.employees = data;
          this.cd.detectChanges();
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  searchEmployees() {
    const text = this.searchText.toLowerCase();

    this.employees = this.allEmployees.filter(emp =>
      emp.userName.toLowerCase().includes(text) ||
      emp.firstName.toLowerCase().includes(text) ||
      emp.lastName.toLowerCase().includes(text) ||
      emp.email.toLowerCase().includes(text)||
      emp.phone.toString().includes(text) ||
      emp.department.name.toLowerCase().includes(text)
    );

  }

}