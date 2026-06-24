import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          if (response == null) {
            alert("Invalid username or password");
            return;
          }

          console.log(response);

          localStorage.setItem(
            "user",
            JSON.stringify(response)
          );
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
  }
}
