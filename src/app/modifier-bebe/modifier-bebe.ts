import { Component, OnInit } from '@angular/core';
import { Bebe } from '../models/bebe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Admin } from '../services/admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-bebe',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './modifier-bebe.html',
  styleUrl: './modifier-bebe.css',
})
export class ModifierBebe implements OnInit{


  bebeId!: number;
  bebe: Bebe = { id: 0, nom: '', prenom: '', dateNais: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: Admin
  ) {}

 ngOnInit() {
  this.bebeId = +this.route.snapshot.paramMap.get('id')!;
  this.adminService.getBebeById(this.bebeId).subscribe({
    next: (b) => this.bebe = b,
    error: (err) => console.error('Impossible de récupérer bébé', err)
  });
}

saveBebe() {
  this.adminService.updateBebe(this.bebe.id!, this.bebe).subscribe({
    next: () => this.router.navigate(['/admin/bebes']),
    error: (err) => console.error('Erreur modification', err)
  });
}
 logout() {
    this.adminService.logout();
    this.router.navigate(['/login']);
  }
}