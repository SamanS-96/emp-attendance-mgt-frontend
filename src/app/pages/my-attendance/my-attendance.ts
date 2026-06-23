import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-attendance',
  imports: [
    MatTableModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './my-attendance.html',
  styleUrl: './my-attendance.css',
})
export class MyAttendance implements OnInit {

  searchText:string='';
  allAttendances:any[]=[];
  attendances:any[]=[];
  currentUser:any;

  displayedColumns:string[]=[
    'userName',
    'attendanceDate',
    'checkInTime',
    'checkOutTime',
    'workingHours',
    'status'
  ];

  constructor(
    private attendanceService:AttendanceService,
    private cd:ChangeDetectorRef,
    private router:Router,
    private authService:AuthService
  ){}

  ngOnInit():void{
    this.currentUser=this.authService.getUser();
    this.loadMyAttendance();
  }

  loadMyAttendance(){
    this.attendanceService.getAllByUserName(this.authService.getUsername())
    .subscribe({
      next:(data:any)=>{
        console.log("ATT DATA :",data);
        this.allAttendances=data;
        this.attendances=data;
        this.cd.detectChanges();
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  searchAttendance(){
    const text=this.searchText.toLowerCase();

    this.attendances=this.allAttendances.filter(att =>
      att.userName.toLowerCase().includes(text) ||
      att.attendanceDate.toString().includes(text) ||
      att.status.toLowerCase().includes(text)
    );
  }
}