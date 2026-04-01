import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Admin } from '../../services/admin';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-bebe',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './ajouter-bebe.html',
  styleUrl: './ajouter-bebe.css',
})
export class AjouterBebe implements OnInit {

  parentId!: number;

  bebe = {
    nom: '',
    prenom: '',
    dateNais: ''
  };

  constructor(
    private route: ActivatedRoute,
    private adminService: Admin,
    private router: Router
  ) {}

  ngOnInit() {
    this.parentId = Number(this.route.snapshot.paramMap.get('parentId'));
  }

ajouterBebe(form: any) {
  if (form.invalid) {
    return;
  }

  this.adminService.ajouterBebe(this.parentId, this.bebe).subscribe({
    next: () => {
      alert('Ajout avec succès ✅');
      this.router.navigate(['/admin-bebes', this.parentId]);
    },
    error: () => alert('Erreur ❌')
  });
}
logout() {
    this.adminService.logout();
    this.router.navigate(['/login']);
  }
}
