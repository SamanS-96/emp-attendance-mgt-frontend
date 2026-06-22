import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private api = 'http://localhost:8080/employees';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.api + '/get-all');
    }

    getEmpCount(){
        return this.http.get<number>(this.api + '/get-count');
    }

    save(employee: any) {
        return this.http.post(this.api + '/save', employee);
    }

    deactivate(id: number) {
        return this.http.put(this.api + '/deactivate/' + id, {});
    }

    getById(id: number) {
        return this.http.get(this.api + '/get/' + id);
    }

    update(id: number, employee: any) {
        return this.http.put(this.api + '/update/' + id, employee);
    }

    getRoles() {
        return this.http.get<string[]>('http://localhost:8080/employees/roles');
    }

    getDepartmentNames() {
        return this.http.get<string[]>('http://localhost:8080/departments/get-names');
    }


}
