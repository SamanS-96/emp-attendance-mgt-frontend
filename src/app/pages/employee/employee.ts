import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-employee',
  imports: [
    MatTableModule
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {

  employees: any[] = [];

  displayedColumns: string[] = [
    'code',
    'firstName',
    'email'
  ];

  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {

  this.employeeService.getAll()
    .subscribe({
      next: (data:any)=>{

        console.log("EMP DATA :", data);

        this.employees = data;

      },
      error:(error)=>{
        console.log(error);
      }
    });

}
}