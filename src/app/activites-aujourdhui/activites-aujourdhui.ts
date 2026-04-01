import { Component, OnInit } from '@angular/core';
import { ActiviteBebe } from '../models/activiteBebe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';
import { Admin } from '../services/admin';

@Component({
  selector: 'app-activites-aujourdhui',
  imports: [CommonModule,RouterLink],
  templateUrl: './activites-aujourdhui.html',
  styleUrl: './activites-aujourdhui.css',
})
export class ActivitesAujourdhui implements OnInit {
  activites: ActiviteBebe[] = [];
  bebeId!: number;
  isAdmin = false;
  loading = true;
  bebeNom: string = '';

  constructor(
    private route: ActivatedRoute,
    private auth: Auth,
    private admin: Admin,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bebeId = +params.get('bebeId')!;
      const user = this.auth.getUser();
this.isAdmin = user?.role === 'ROLE_ADMIN';
      this.loadActivites();
    });
  }

  loadActivites() {
    this.loading = true;
    if (this.isAdmin) {
      this.admin.getActivitesAujourdhuiAdmin(this.bebeId).subscribe({
        next: acts => {
          this.activites = acts;
          this.loading = false;
        },
        error: err => {
          console.error('Admin error:', err);
          this.loading = false;
        }
      });
    } else {
      this.auth.getActivitesAujourdhui(this.bebeId).subscribe({
        next: acts => {
          this.activites = acts;
          this.loading = false;
        },
        error: err => {
          console.error('Parent error:', err);
          this.loading = false;
        }
      });
    }
  }

  voirActivitesAujourdhui(bebeId: number) {
    if (this.isAdmin) {
      this.router.navigate(['/admin/activites-aujourdhui', bebeId]);
    } else {
      this.router.navigate(['/activites-aujourdhui', bebeId]);
    }
  }
 modifierActivite(actId: number) {
  console.log('TOKEN:', this.auth.getToken());
  this.router.navigate(['/admin/modifier-activite', actId]);
}

supprimerActivite(actId: number) {
  if (!confirm(`Voulez-vous vraiment supprimer cette activité ?`)) return;
  this.admin.deleteActivite(actId).subscribe({
    next: () => {
      alert('Activité supprimée avec succès !');
      this.loadActivites();
    },
    error: err => {
      console.error(err);
      alert('Erreur lors de la suppression !');
    }
  });
}

  retourListe() {
    if (this.isAdmin) this.router.navigate(['/admin/bebes']);
    else this.router.navigate(['/parent']);
  }
   logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}