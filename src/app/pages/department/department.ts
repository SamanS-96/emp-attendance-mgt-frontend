import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [
    MatTableModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  searchText:string='';
  allDepartments:any[]=[];
  departments:any[]=[];
  currentUser:any;

  displayedColumns:string[]=[
    'name',
    'description',
    'action'
  ];

  constructor(
    private departmentService:DepartmentService,
    private cd:ChangeDetectorRef,
    private router:Router,
    private authService:AuthService
  ){}

  ngOnInit():void{
    this.currentUser=this.authService.getUser();
    this.loadDepartments();
  }

  addDepartment(){
    this.router.navigate(['/department-add']);
  }

  editDepartment(id:number){
    this.router.navigate(['/department-edit',id]);
  }

  loadDepartments(){
    this.departmentService.getAll()
    .subscribe({
      next:(data:any)=>{
        console.log("DPT DATA :",data);
        this.allDepartments=data;
        this.departments=data;
        this.cd.detectChanges();
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  searchDepartments(){
    const text=this.searchText.toLowerCase();

    this.departments=this.allDepartments.filter(dpt=>
      dpt.name.toLowerCase().includes(text) ||
      dpt.description.toLowerCase().includes(text)
    );
  }
}