import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../../services/leave-request';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-leaves',
  imports: [
    MatTableModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './my-leaves.html',
  styleUrl: './my-leaves.css',
})
export class MyLeaves implements OnInit {

  searchText: string = '';
  allLeaveRequests: any[] = [];
  leaveRequests: any[] = [];
  currentUser: any;

  displayedColumns: string[] = [
    'userName',
    'fromDate',
    'toDate',
    'reason',
    'status'
  ];

  constructor(
    private leaveRequestService: LeaveRequestService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.loadMyLeaves();
  }

  addLeaveRequest() {
    this.router.navigate(['/leave-request-add']);
  }

  editLeaveRequest(id: number) {
    this.router.navigate(['/leave-request-edit', id]);
  }

  loadMyLeaves() {
    this.leaveRequestService.getAllByUserName(this.authService.getUsername())
      .subscribe({
        next: (data: any) => {
          console.log("LR DATA :", data);
          this.allLeaveRequests = data;
          this.leaveRequests = data;
          this.cd.detectChanges();
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  searchLeaveRequests() {
    const text = this.searchText.toLowerCase();

    this.leaveRequests = this.allLeaveRequests.filter(lr =>
      lr.userName.toLowerCase().includes(text) ||
      lr.fromDate.toString().includes(text) ||
      lr.toDate.toString().includes(text) ||
      lr.reason.toLowerCase().includes(text) ||
      lr.status.toLowerCase().includes(text)
    );
  }

}