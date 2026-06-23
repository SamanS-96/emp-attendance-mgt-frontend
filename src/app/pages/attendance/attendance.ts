import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  imports: [
    MatTableModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance implements OnInit {

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
    private authService:AuthService
  ){}

  ngOnInit():void{
    this.currentUser=this.authService.getUser();
    this.loadAttendance();
  }

  loadAttendance(){
    this.attendanceService.getAll()
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

    this.attendances=this.allAttendances.filter(att=>
      att.userName.toLowerCase().includes(text) ||
      att.attendanceDate.toString().includes(text) ||
      att.status.toLowerCase().includes(text)
    );
  }
}