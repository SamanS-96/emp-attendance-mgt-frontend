import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../../services/leave-request';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-request',
  imports: [
    MatTableModule,
    MatButtonModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './leave-request.html',
  styleUrl: './leave-request.css',
})
export class LeaveRequest implements OnInit {

  searchText:string='';
  allLeaveRequests:any[]=[];
  leaveRequests:any[]=[];
  currentUser:any;

  displayedColumns:string[]=[
    'userName',
    'fromDate',
    'toDate',
    'reason',
    'action'
  ];

  constructor(
    private leaveRequestService:LeaveRequestService,
    private cd:ChangeDetectorRef,
    private router:Router,
    private authService:AuthService
  ){}

  ngOnInit():void{
    this.currentUser=this.authService.getUser();
    this.loadLeaveRequests();
  }

  approveLeaveRequest(id:number):void{

    if (!confirm("Are you sure want to Approve this leave?")) {
      return;
    }

    this.leaveRequestService.approveLeaveRequest(id)
    .subscribe({
      next:(response:any)=>{
        console.log(response);
        this.loadLeaveRequests();
      }
    });
  }

  rejectLeaveRequest(id:number):void{

    if (!confirm("Are you sure want to Reject this leave?")) {
      return;
    }

    this.leaveRequestService.rejectLeaveRequest(id)
    .subscribe({
      next:(response:any)=>{
        console.log(response);
        this.loadLeaveRequests();
      }
    });
  }

  loadLeaveRequests(){
    this.leaveRequestService.getAll()
    .subscribe({
      next:(data:any)=>{
        console.log("LR DATA :",data);
        this.allLeaveRequests=data;
        this.leaveRequests=data;
        this.cd.detectChanges();
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  searchLeaveRequests(){
    const text=this.searchText.toLowerCase();

    this.leaveRequests=this.allLeaveRequests.filter(lr =>
      lr.userName.toLowerCase().includes(text) ||
      lr.fromDate.toString().includes(text) ||
      lr.toDate.toString().includes(text) ||
      lr.reason.toLowerCase().includes(text) ||
      lr.status.toLowerCase().includes(text)
    );
  }

}