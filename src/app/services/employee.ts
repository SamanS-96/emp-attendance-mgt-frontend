import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private api = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.api + '/get-all');
  }
}
