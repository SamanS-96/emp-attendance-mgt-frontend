import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { AttendanceService } from '../../services/attendance';
import { EmployeeService } from '../../services/employee';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{

  currentUser: any;
  employeeCount: number | null = null;
  presentTodayCount: number | null = null;
  absentTodayCount: number | null = null;
  myStatus: string | null = null;
  
  constructor(
    private authService: AuthService,
    private attendanceService: AttendanceService,
    private employeeService: EmployeeService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.loadDashboardDetails();
  }

  loadDashboardDetails(){
    this.employeeService.getEmpCount()
      .subscribe({
        next: (count: number) => {
          this.employeeCount = count;
          this.cd.detectChanges();
        }
      });
    
    this.attendanceService.getTodayAttendanceDetails(this.authService.getUsername())
      .subscribe({
        next: (response: any) => {
          this.presentTodayCount = response.presentToday;
          this.absentTodayCount = response.absentToday;
          this.myStatus = response.myStatus;
          this.cd.detectChanges();
        }
      });
  }

  saveCheckIn(){

    const checkInUser = {
      "userName": this.authService.getUsername()
    }

    this.attendanceService.saveCheckIn(checkInUser)
      .subscribe({
          next: (message: string) => {
            console.log("Message :", message);
            alert(message);
          },
          error: (error) => {
            console.log(error);
            alert("CheckIn Failed, Please Try Again !");
          }
      });
  }

  saveCheckOut(){

    const checkOutUser = {
      "userName": this.authService.getUsername()
    }

    this.attendanceService.saveCheckOut(checkOutUser)
      .subscribe({
          next: (message: string) => {
            console.log("Message :", message);
            alert(message);
          },
          error: (error) => {
            console.log(error);
            alert("CheckOut Failed, Please Try Again !");
          }
      });
    
  }

}
