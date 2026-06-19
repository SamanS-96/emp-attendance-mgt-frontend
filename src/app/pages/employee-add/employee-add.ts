import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee-add',
  imports: [
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './employee-add.html',
  styleUrl: './employee-add.css',
})
export class EmployeeAdd {

  employeeForm: FormGroup;
  employeeId!: number;
  isEditMode = false;
  roles: string[] = [];
  departments: string[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {

    this.employeeForm = this.fb.group({

      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      department: [''],
      role: ['']

    });

  }

  ngOnInit(): void {
    this.loadRoles();
    this.loadDepartments();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId = Number(id);
      this.isEditMode = true;
      this.loadEmployee(this.employeeId);
    }
  }

  loadEmployee(id: number) {
    this.employeeService
      .getById(id)
      .subscribe({
        next: (employee: any) => {
          this.employeeForm.patchValue({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            department: employee.department?.name,
            role: employee.role
          });
        }
      });
  }

  save() {
    const employee = this.employeeForm.value;
    if (this.isEditMode) {
      this.employeeService
        .update(this.employeeId, employee)
        .subscribe({
          next: () => {
            alert("Employee Updated");
            this.router.navigate(['/employee']);
          }
        });
    } else {
      this.employeeService
        .save(employee)
        .subscribe({
          next: () => {
            alert("Employee Saved");
            this.router.navigate(['/employee']);
          }
        });
    }
  }

  loadRoles() {
    this.employeeService
      .getRoles()
      .subscribe({
        next: (data) => {
          this.roles = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  loadDepartments() {
    this.employeeService
      .getDepartmentNames()
      .subscribe({
        next: (data) => {
          this.departments = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

}
