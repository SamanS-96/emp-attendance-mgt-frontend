import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {

  employees: any[] = [];

  displayedColumns: string[] = [
    'code',
    'firstName',
    'email',
    'action'
  ];

  constructor(
    private employeeService: EmployeeService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
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

  loadEmployees(){
    this.employeeService.getAll()
      .subscribe({
        next: (data: any) => {
          console.log("EMP DATA :", data);
          this.employees = data;
          this.cd.detectChanges();
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

}