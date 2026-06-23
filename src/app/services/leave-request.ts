import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LeaveRequestService {

    private api = 'http://localhost:8080/leave';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.api + '/get-all');
    }

    save(leaveRequest: any) {
        return this.http.post(this.api + '/leave-request', leaveRequest);
    }

    update(id: number, leaveRequest: any) {
        return this.http.put(this.api + '/leave-update/' + id, leaveRequest);
    }

    getById(id: number) {
        return this.http.get(this.api + '/get/' + id);
    }

    getAllByUserName(userName: any) {
        return this.http.get(this.api + '/get-allByUserName?userName=' + userName);
    }

    approveLeaveRequest(id: number) {
        return this.http.put(this.api + '/leave-request/approve/' +id, {}); 
    }


    rejectLeaveRequest(id: number) {
        return this.http.put(this.api + '/leave-request/reject/' +id, {}); 
    }
}


