import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth';

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
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {

    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      departmentName: ['', Validators.required],
      role: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
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
    this.employeeService.getById(id)
      .subscribe({
        next: (employee: any) => {
          this.employeeForm.patchValue({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            departmentName: employee.department?.name,
            role: employee.role
          });
        }
      });
  }

  save() {

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const employee = this.employeeForm.value;

    if (this.isEditMode) {
      this.employeeService.update(this.employeeId, employee)
        .subscribe({
          next: (response: any) => {
            if (response == null) {
              alert("email same for exist Employee !");
            } else {
               alert(
                "Employee Updated Successfully!\n\n" +
                "Username: " + response.userName + "\n" +
                "Password: " + response.password
              );
              this.router.navigate(['/employee']);
            }
          }
        });
    } else {
      this.employeeService.save(employee)
        .subscribe({
          next: (response: any) => {
            if (response == null) {
              alert("This Employee allready Added !");
            } else {
              alert(
                "Employee Saved Successfully!\n\n" +
                "Username: " + response.userName + "\n" +
                "Password: " + response.password
              );
              this.router.navigate(['/employee']);
            }
          }
        });
    }
  }

  loadRoles() {
    this.employeeService.getRoles()
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
    this.employeeService.getDepartmentNames()
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