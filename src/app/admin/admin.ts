import { Component, OnInit } from '@angular/core';
import { Admin } from '../services/admin';
import { Route, Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-admin',
  imports: [RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Adminn implements OnInit {

  parents: any[] = [];
  bebes: any[] = [];
  activites: any[] = [];

  constructor(private adminService: Admin,private router:Router,private auth:Auth) {}

  ngOnInit() {}

  loadParents() {
    this.adminService.getAllParents().subscribe(res => {
      this.parents = res;
    });
  }

  loadBebes() {
    this.adminService.getAllBebes().subscribe(res => {
      this.bebes = res;
    });
  }

  loadActivites() {
    this.adminService.getAllActivites().subscribe(res => {
      this.activites = res;
    });
  }
    logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  
}
