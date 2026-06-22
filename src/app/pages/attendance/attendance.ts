import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-attendance',
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})

export class Attendance implements OnInit {

  attendances: any[] = [];

  displayedColumns: string[] = [
    'userName',
    'attendanceDate',
    'checkInTime',
    'checkOutTime',
    'workingHours',
    'status'
  ];

  constructor(
    private attendanceService: AttendanceService,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance(){
    this.attendanceService.getAll()
      .subscribe({
        next: (data: any) => {
          console.log("ATT DATA :", data);
          this.attendances = data;
          this.cd.detectChanges();
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
