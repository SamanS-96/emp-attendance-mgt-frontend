import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveRequestService } from '../../services/leave-request';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-leave-request-add',
  imports: [
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './leave-request-add.html',
  styleUrl: './leave-request-add.css',
})
export class LeaveRequestAdd implements OnInit {

  leaveRequestForm: FormGroup;
  leaveRequestId!: number;
  isEditMode = false;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private leaveRequestService: LeaveRequestService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.leaveRequestForm = this.fb.group({
      userName: [{ value: '', disabled: true }],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();

    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (id) {
      this.leaveRequestId = Number(id);
      this.isEditMode = true;
      this.loadLeaveRequest(this.leaveRequestId);
    } else {
      this.leaveRequestForm.patchValue({
        userName: this.authService.getUsername()
      });
    }
  }

  loadLeaveRequest(id: number) {
    this.leaveRequestService.getById(id)
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
    if (this.leaveRequestForm.invalid) {
      this.leaveRequestForm.markAllAsTouched();
      return;
    }
    const leaveRequest = this.leaveRequestForm.getRawValue();
    if (this.isEditMode) {
      this.leaveRequestService.update(this.leaveRequestId, leaveRequest)
        .subscribe({
          next: (response: any) => {
            if (response == false) {
              alert("You Allready applied leave for these days !");
            } else {
              alert("LeaveRequest Updated Succesful !");
              this.router.navigate(['/my-leaves']);
            }
          }
        });
    } else {
      this.leaveRequestService.save(leaveRequest)
        .subscribe({
          next: (response: any) => {
            if (response == false) {
              alert("You Allready applied leave for these days !");
            } else {
              alert("LeaveRequest Saved Succesful !");
              this.router.navigate(['/my-leaves']);
            }
          }
        });
    }
  }
}