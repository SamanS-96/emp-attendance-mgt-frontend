import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {

  departments: any[] = [];

  displayedColumns: string[] = [
    'name',
    'description',
    'action'
  ];

  constructor(
    private departmentService: DepartmentService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  addDepartment() {
    this.router.navigate(['/department-add']);
  }

  editDepartment(id: number) {
    this.router.navigate([
      '/department-edit',
      id
    ]);
  }

  loadDepartments(){
    this.departmentService.getAll()
      .subscribe({
        next: (data: any) => {
          console.log("DPT DATA :", data);
          this.departments = data;
          this.cd.detectChanges();
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

}