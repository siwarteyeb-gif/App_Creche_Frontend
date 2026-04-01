import { Component, OnInit } from '@angular/core';
import { Admin } from '../../services/admin';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-admin-admins',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-admins.html',
  styleUrl: './admin-admins.css',
})
export class AdminAdmins implements OnInit {
  admin: any = null;
  errorMessage: string = '';

  constructor(private adminService: Admin,private auth:Auth ,private router:Router) {}

  ngOnInit(): void {
    this.adminService.getProfilAdmin().subscribe({
      next: (data) => {
        this.admin = data;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erreur lors du chargement du profil';
      }
    });
  }
   logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
