import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Admin } from '../../services/admin';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../services/auth';
import { ActiviteBebe } from '../../models/activiteBebe';

@Component({
  selector: 'app-admin-bebes',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-bebes.html',
  styleUrl: './admin-bebes.css',
})
export class AdminBebes implements OnInit {
 bebes: any[] = [];
  errorMessage = '';
  parentId?: number;
  activitesAujourdhui: ActiviteBebe[] = [];
    activites: ActiviteBebe[] = [];

  constructor(private adminService: Admin, private route: ActivatedRoute, private auth: Auth,private router:Router) {}

  ngOnInit() {
    this.parentId = Number(this.route.snapshot.paramMap.get('parentId'));

    if (this.parentId) {
      this.adminService.getBebesByParent(this.parentId).subscribe({
        next: (data) => this.bebes = data,
        error: () => this.errorMessage = 'Erreur lors du chargement des bébés du parent',
      });
    } else {
      this.loadAllBebes();
    }
  }

  loadAllBebes() {
    this.adminService.getAllBebes().subscribe({
      next: (data) => this.bebes = data,
      error: () => this.errorMessage = 'Erreur lors de récupération de tous les bébés',
    });
  }
  voirActivitesAujourdhuiAdmin(bebeId: number) {
  this.router.navigate(['/admin/activites-aujourdhui', bebeId]);
}
  supprimerBebe(id: number, nom: string, prenom: string) {
  if (!confirm(`Voulez-vous vraiment supprimer ${nom} ${prenom} ?`)) return;
  this.adminService.deleteBebe(id).subscribe({
    next: () => {
      alert('Bébé supprimé avec succès !');

      this.loadAllBebes();
    },
    error: () => alert('Erreur lors de la suppression !')
  });
}
 voirActivites(bebeId: number) {
    this.auth.getActivitesOfBebe(bebeId).subscribe({
      next: (acts) => (this.activites = acts),
      error: () => alert('Erreur lors du chargement des activités')
    });
  }
  modifierBebe(bebeId: number) {
  this.router.navigate(['/modifier-bebe', bebeId]);

}
   logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  
}