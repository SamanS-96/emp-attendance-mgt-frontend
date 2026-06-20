import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {

    private api = 'http://localhost:8080/attendance';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.api + '/get-all');
    }

    saveCheckIn(attendance: any) {
        return this.http.post(this.api + '/check-in', attendance);
    }

    saveCheckOut(attendance: any) {
        return this.http.post(this.api + '/check-out', attendance);
    }

}



