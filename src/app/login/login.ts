import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.html',
    styleUrls: ['./login.css']

})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: Auth, private router: Router) {}

login() {
  this.auth.login(this.email, this.password).subscribe({
    next: (res: any) => {
      this.auth.setToken(res.token);
      this.auth.setRole(res.role);

      if (res.role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin']);
      } else if (res.role === 'ROLE_PARENT') {
        this.router.navigate(['/parent']);
      } else {
        this.errorMessage = 'role inconnu';
      }
    },
    error: (err) => {
      this.errorMessage = 'Email ou mot de passe incorrect';
    }
  });
}
}
