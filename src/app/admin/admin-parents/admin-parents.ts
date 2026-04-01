import { Component, OnInit } from '@angular/core';
import { Admin } from '../../services/admin';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-admin-parents',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-parents.html',
  styleUrl: './admin-parents.css',
})
export class AdminParents  implements OnInit {
  parents: any[] = [];
  errorMessage = '';
  bebes: any[] = [];
  selectedParentId: number | null = null;
  constructor(private adminService: Admin,private router: Router,private auth:Auth) {}

 ngOnInit() {
    this.loadParents();
  }

  loadParents() {
    this.adminService.getAllParents().subscribe({
      next: (data) => (this.parents = data),
      error: (err) => (this.errorMessage = 'Erreur lors de récupération des parents')
    });
  }

  supprimerParent(id: number, nom: string, prenom: string) {
    const conf = confirm(`Voulez-vous vraiment supprimer ${nom} ${prenom} ?`);
    if (!conf) return;

    this.adminService.deleteParent(id).subscribe({
      next: () => {
        alert('Parent supprimé avec succès !');
        this.loadParents();
      },
      error: (err) => alert('Erreur lors de la suppression !')
    });
  }
  voirBebes(parentId: number) {
    this.router.navigate(['/admin-bebes', parentId]);
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
