import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './employee-add.html',
  styleUrl: './employee-add.css',
})
export class EmployeeAdd {

  employeeForm: FormGroup;

  roles = [
    'ADMIN',
    'EMPLOYEE'
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {

    this.employeeForm = this.fb.group({

      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      departmentId: [''],
      role: ['']

    });

  }

  save(){
    const employee = this.employeeForm.value;
    this.employeeService.save(employee)
      .subscribe({
        next:(response)=>{
          console.log("Saved", response);
          alert("Employee Saved");
          this.router.navigate(['/employee']);
        },
        error:(error)=>{
          console.log(error);
        }
      });
  }

}
