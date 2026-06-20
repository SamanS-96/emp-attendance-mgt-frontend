import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../../services/leave-request';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-request',
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './leave-request.html',
  styleUrl: './leave-request.css',
})
export class LeaveRequest implements OnInit {

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadLeaveRequests();
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

  loadLeaveRequests(){
    this.leaveRequestService.getAll()
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