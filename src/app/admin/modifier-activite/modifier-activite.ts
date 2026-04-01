import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ActiviteBebe } from '../../models/activiteBebe';
import { Admin } from '../../services/admin';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-modifier-activite',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './modifier-activite.html',
  styleUrl: './modifier-activite.css',
})
export class ModifierActivite  implements OnInit {
 activiteId!: number;
 bebeId!:number;
  typeActivite: string = '';
  notes: string = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private admin: Admin,
    private router: Router,private auth:Auth
  ) {}

  ngOnInit() {
    this.activiteId = Number(this.route.snapshot.paramMap.get('id'));
      this.bebeId = Number(this.route.snapshot.queryParamMap.get('bebeId')) || 1;

    this.admin.getActiviteById(this.activiteId).subscribe({
      next: act => {
        this.typeActivite = act.typeActivite;
        this.notes = act.notes;
        this.loading = false;
      },
      error: () => {
        alert('Erreur chargement activité');
        this.loading = false;
      }
    });
  }

  enregistrer() {
    const data = {
      typeActivite: this.typeActivite,
      notes: this.notes
    };

    this.admin.updateActivite(this.activiteId, data).subscribe({
      next: () => {
        alert('Activité modifiée ✔️');
      this.router.navigate(['/admin/activites-aujourdhui', this.bebeId]);
      },
      error: () => alert('Erreur modification ❌')
    });
  }

  annuler() {
    this.router.navigate(['/admin/activites']);
  }
   logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}