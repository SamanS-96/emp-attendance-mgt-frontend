import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { LeaveRequestService } from '../../services/leave-request';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-leave-request-add',
  imports: [
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './leave-request-add.html',
  styleUrl: './leave-request-add.css',
})
export class LeaveRequestAdd {

  leaveRequestForm: FormGroup;
  leaveRequestId!: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private leaveRequestService: LeaveRequestService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {

    this.leaveRequestForm = this.fb.group({

      userName: [''],
      fromDate: [''],
      toDate: [''],
      reason: [''],

    });

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.leaveRequestId = Number(id);
      this.isEditMode = true;
      this.loadLeaveRequest(this.leaveRequestId);
    }
  }

  loadLeaveRequest(id: number) {
    this.leaveRequestService
      .getById(id)
      .subscribe({
        next: (leaveRequest: any) => {
          this.leaveRequestForm.patchValue({
            userName: leaveRequest.userName,
            fromDate: leaveRequest.fromDate,
            toDate: leaveRequest.toDate,
            reason: leaveRequest.reason
          });
        }
      });
  }

  save() {
    const leaveRequest = this.leaveRequestForm.value;
    if (this.isEditMode) {
      this.leaveRequestService
        .update(this.leaveRequestId, leaveRequest)
        .subscribe({
          next: () => {
            alert("LeaveRequest Updated");
            this.router.navigate(['/my-leaves']);
          }
        });
    } else {
      this.leaveRequestService
        .save(leaveRequest)
        .subscribe({
          next: () => {
            alert("LeaveRequest Saved");
            this.router.navigate(['/my-leaves']);
          }
        });
    }
  }

}
