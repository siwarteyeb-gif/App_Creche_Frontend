import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ActiviteBebe } from '../models/activiteBebe';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activite-maintenant',
  imports: [CommonModule,RouterLink],
  templateUrl: './activite-maintenant.html',
  styleUrl: './activite-maintenant.css',
})
export class ActiviteMaintenant  implements OnInit {
  activite: ActiviteBebe | null = null;
  bebeId!: number;

  constructor(private route: ActivatedRoute, private auth: Auth,private router:Router) {}

  ngOnInit() {
    this.bebeId = +this.route.snapshot.paramMap.get('bebeId')!;
    this.auth.getActiviteMaintenant(this.bebeId).subscribe({
      next: (act) => this.activite = act,
      error: (err) => console.error(err)
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}