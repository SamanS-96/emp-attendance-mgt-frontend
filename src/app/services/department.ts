import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    private api = 'http://localhost:8080/departments';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.api + '/get-all');
    }

    save(department: any) {
        return this.http.post(this.api + '/save', department);
    }

    getById(id: number) {
        return this.http.get(this.api + '/get/' + id);
    }

    update(id: number, department: any) {
        return this.http.put(this.api + '/update/' + id, department);
    }

}

