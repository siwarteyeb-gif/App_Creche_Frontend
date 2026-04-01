import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Bebe } from '../models/bebe';
import { ActiviteBebe } from '../models/activiteBebe';
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './parent.html',
  styleUrls: ['./parent.css'],
})
export class Parent implements OnInit {
  bebesList: Bebe[] = []; // typage correct
   activitesAujourdhui: ActiviteBebe[] = []; 
  activiteMaintenant: ActiviteBebe | null = null; 
  constructor(private auth: Auth, private router: Router) {}

    ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      console.warn('Parent non connecté');
      return;
    }

    this.auth.getBebes().subscribe({
      next: (bebes: Bebe[]) => { 
        this.bebesList = bebes; 
      },
      error: (err) => { 
        console.error('Erreur récupération bébés:', err); 
      }
    });
  }
goToActivitesAujourdhui(bebeId: number) {
  this.router.navigate(['/activites-aujourdhui', bebeId]);
}

goToActiviteMaintenant(bebeId: number) {
  this.router.navigate(['/activite-maintenant', bebeId]);
}
 logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
