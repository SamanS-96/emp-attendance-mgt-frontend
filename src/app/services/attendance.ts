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
        return this.http.put(this.api + '/check-in', attendance, { responseType: 'text' });
    }

    saveCheckOut(attendance: any) {
        return this.http.put(this.api + '/check-out', attendance, { responseType: 'text' });
    }

    getAllByUserName(userName: any){
        return this.http.get(this.api + '/get-allByUserName?userName=' + userName);
    }

    getTodayAttendanceDetails(userName: string){
        return this.http.get(this.api + '/get-today-details/' + userName);
    }
    
}



