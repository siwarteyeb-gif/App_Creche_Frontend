import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Auth } from '../../services/auth';
import { Admin } from '../../services/admin';

@Component({
  selector: 'app-modifier-profil',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './modifier-profil.html',
  styleUrl: './modifier-profil.css',
})
export class ModifierProfil implements OnInit {

  parent: any = null;
  message = '';
  errorMessage = '';
  isAdminEdit = false;

  constructor(
    private auth: Auth,
    private adminService: Admin,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdminEdit = this.auth.isAdmin();

    const parentId = this.route.snapshot.paramMap.get('id');

    if (this.isAdminEdit && parentId) {
      this.adminService.getParentById(+parentId).subscribe({
        next: (p) => (this.parent = p),
        error: () => (this.errorMessage = 'Erreur chargement parent'),
      });
    } else {
      this.chargerProfil();
    }
  }

  chargerProfil(): void {
    this.auth.getParent().subscribe({
      next: (p) => (this.parent = p),
      error: () => (this.errorMessage = 'Erreur chargement profil'),
    });
  }

  modifierProfil(): void {
    const parentId = this.route.snapshot.paramMap.get('id');

    if (this.isAdminEdit && parentId) {
      // admin
      this.adminService.updateParent(+parentId, this.parent).subscribe({
        next: () => (this.message = 'Profil modifié avec succès ✔️'),
        error: () => (this.errorMessage = 'Erreur lors de la modification ❌'),
      });
    } else {
      // parent
      this.auth.modifierParent(this.parent).subscribe({
        next: () => (this.message = 'Profil modifié avec succès ✔️'),
        error: () => (this.errorMessage = 'Erreur lors de la modification ❌'),
      });
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
