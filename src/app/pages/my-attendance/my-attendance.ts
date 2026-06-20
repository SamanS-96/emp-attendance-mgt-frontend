import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-my-attendance',
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './my-attendance.html',
  styleUrl: './my-attendance.css',
})

export class MyAttendance implements OnInit {

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
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadMyAttendance();
  }

  loadMyAttendance() {
    this.attendanceService.getAllByUserName(this.authService.getUsername())
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

