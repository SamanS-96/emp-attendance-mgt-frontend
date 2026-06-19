import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DepartmentService } from '../../services/department';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-department-add',
  imports: [
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './department-add.html',
  styleUrl: './department-add.css',
})
export class DepartmentAdd {

  departmentForm: FormGroup;
  departmentId!: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {

    this.departmentForm = this.fb.group({

      name: [''],
      description: ['']

    });

  }

  ngOnInit(): void {
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
    const department = this.departmentForm.value;
    if (this.isEditMode) {
      this.departmentService
        .update(this.departmentId, department)
        .subscribe({
          next: () => {
            alert("Department Updated");
            this.router.navigate(['/department']);
          }
        });
    } else {
      this.departmentService
        .save(department)
        .subscribe({
          next: () => {
            alert("Department Saved");
            this.router.navigate(['/department']);
          }
        });
    }
  }

}
