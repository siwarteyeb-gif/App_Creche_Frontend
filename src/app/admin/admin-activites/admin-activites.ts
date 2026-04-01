import { Component, OnInit } from '@angular/core';
import { Admin } from '../../services/admin';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-activites',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-activites.html',
  styleUrl: './admin-activites.css',
})
export class AdminActivites implements OnInit {
  activites: any[] = [];
  errorMessage = '';

  constructor(private adminService: Admin) {}

  ngOnInit() {
    this.adminService.getAllActivites().subscribe({
      next: (data) => this.activites = data,
      error: (err) => this.errorMessage = 'Erreur lors de récupération des activités'
    });
  }
  
}
