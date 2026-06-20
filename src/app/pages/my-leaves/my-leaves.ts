import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../../services/leave-request';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-my-leaves',
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './my-leaves.html',
  styleUrl: './my-leaves.css',
})
export class MyLeaves implements OnInit {

  leaveRequests: any[] = [];

  displayedColumns: string[] = [
    'userName',
    'fromDate',
    'toDate',
    'reason',
    'status',
    'action'
  ];

  constructor(
    private leaveRequestService: LeaveRequestService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadMyLeaves();
  }

  addLeaveRequest() {
    this.router.navigate(['/leave-request-add']);
  }

  editLeaveRequest(id: number) {
    this.router.navigate([
      '/leave-request-edit',
      id
    ]);
  }

  loadMyLeaves(){
    this.leaveRequestService.getAllByUserName(this.authService.getUsername())
      .subscribe({
        next: (data: any) => {
          console.log("LR DATA :", data);
          this.leaveRequests = data;
          this.cd.detectChanges();
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

}