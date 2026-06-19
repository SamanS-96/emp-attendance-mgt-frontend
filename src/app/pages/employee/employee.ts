import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {

  employees: any[] = [];

  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {

    this.employeeService.getAll()
      .subscribe({
        next: (data: any) => {
          console.log('SUCCESS', data);
          this.employees = data;
        },
        error: (error) => {
          console.log('ERROR', error);
        }
      });

  }
}
