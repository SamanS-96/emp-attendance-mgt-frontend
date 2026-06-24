import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../services/department';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-department-add',
  imports: [
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './department-add.html',
  styleUrl: './department-add.css',
})
export class DepartmentAdd implements OnInit {

  departmentForm: FormGroup;
  departmentId!: number;
  isEditMode = false;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

    this.departmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  ngOnInit(): void {

    this.currentUser = this.authService.getUser();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.departmentId = Number(id);
      this.isEditMode = true;
      this.loadDepartment(this.departmentId);
    }

  }

  loadDepartment(id: number) {

    this.departmentService
      .getById(id)
      .subscribe({
        next: (department: any) => {
          this.departmentForm.patchValue({
            name: department.name,
            description: department.description
          });
        }
      });

  }

  save() {

    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();
      return;
    }

    const department = this.departmentForm.value;

    if (this.isEditMode) {

      this.departmentService
        .update(this.departmentId, department)
        .subscribe({
          next: (response: any) => {
            if (response == null) {
              alert("name same for exist Department !");
            } else {
              alert("Department Updated Succesful !");
              this.router.navigate(['/department']);
            }
          }
        });

    } else {

      this.departmentService
        .save(department)
        .subscribe({
          next: (response: any) => {
            if (response == null) {
              alert("This Department allready Added !");
            } else {
              alert("Department Saved Succesful !");
              this.router.navigate(['/department']);
            }
          }
        });

    }

  }

}