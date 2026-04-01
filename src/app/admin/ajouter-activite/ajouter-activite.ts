import { Component, Input } from '@angular/core';
import { Admin } from '../../services/admin';
import { ActiviteBebe } from '../../models/activiteBebe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-ajouter-activite',
  standalone:true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './ajouter-activite.html',
  styleUrl: './ajouter-activite.css',
})
export class AjouterActivite {

  bebeId!: number;
  typeActivite = '';
  date = '';
  temps = '';
  notes = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private adminService: Admin,private auth:Auth
  ) {}

  ngOnInit() {
    this.bebeId = +this.route.snapshot.paramMap.get('id')!;
  }

  ajouter() {
    if (!this.bebeId) return alert('Erreur: Aucun bébé sélectionné');

    const nouvelleActivite = new ActiviteBebe(
      this.typeActivite,
      this.date,
      this.temps,
      this.notes,
      this.bebeId
    );

    this.adminService.ajouterActivite(this.bebeId, nouvelleActivite).subscribe({
      next: () => {
        alert('Activité ajoutée avec succès !');
this.router.navigate(['/admin/activites-aujourdhui', this.bebeId]);
      },
      error: () => alert('Erreur lors de l’ajout')
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}