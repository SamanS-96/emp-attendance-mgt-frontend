import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.api + '/get-user',
      {
        userName: username,
        password: password
      }
    );
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  getRole() {
    const user = this.getUser();
    return user ? user.role : null;
  }

  getUsername() {
    const user = this.getUser();
    return user ? user.userName : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
  isEmployee(): boolean {
    return this.getRole() === 'EMPLOYEE';
  }

}
