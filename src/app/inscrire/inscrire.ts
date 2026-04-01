import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscrire',
  imports: [CommonModule, FormsModule],
  templateUrl: './inscrire.html',
  styleUrl: './inscrire.css',
})
export class Inscrire {
  parent: any = {
    nom: '',
    prenom: '',
    telephone:'',
    email: '',
    password: ''
  };

  message = '';
  errorMessage = '';

  constructor(private auth: Auth,private router:Router) {}

  inscrire() {
  this.message = '';
  this.errorMessage = '';

  this.auth.inscrire(this.parent).subscribe({
    next: (res) => {
      this.message = 'Inscription réussie';
            setTimeout(() => this.router.navigate(['/login']), 2000);
    },
    error: (err) => {
      this.errorMessage = err.error || 'Email déjà utilisé';
    }
  });
}    
}