import { Injectable } from '@angular/core';
import { Auth } from './auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bebe } from '../models/bebe';
import { ActiviteBebe } from '../models/activiteBebe';

@Injectable({
  providedIn: 'root',
})
export class Admin {
   private apiUrl = 'http://localhost:8082/admin';

  constructor(private http: HttpClient, private auth: Auth) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAllParents(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/parents`,
      { headers: this.getHeaders() }
    );
  }

  getAllBebes(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/bebes`,
      { headers: this.getHeaders() }
    );
  }

  getAllActivites(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/activites`,
      { headers: this.getHeaders() }
    );
  }

 

  deleteBebe(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/bebe/${id}`,
      { headers: this.getHeaders(), responseType: 'text' }
    );
  }

  deleteActivite(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/activites/${id}`,
      { headers: this.getHeaders(), responseType: 'text' }
    );
  }
   getAllAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admins`, { headers: this.getHeaders() });
  }
 getParentById(id: number) {
  const token = this.auth.getToken();
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.get<any>(`http://localhost:8082/admin/parent/${id}`, { headers });
}

updateParent(id: number, parent: any) {
  const token = this.auth.getToken();
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.put<any>(`http://localhost:8082/admin/parents/${id}`, parent, { headers });
}
  deleteParent(id: number): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete(`${this.apiUrl}/parent/${id}`, { headers, responseType: 'text' });
  }
  getBebesByParent(parentId: number) {
  const token = this.auth.getToken();
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.get<any[]>(
    `http://localhost:8082/admin/parent/${parentId}/bebes`,
    { headers }
  );
}
getBebeById(id: number) {
  return this.http.get<Bebe>(`${this.apiUrl}/modif/bebe/${id}`, { headers: this.getHeaders() });
}

updateBebe(id: number, bebe: Bebe) {
  return this.http.put(`${this.apiUrl}/bebe/${id}`, bebe, { headers: this.getHeaders() });
}
ajouterActivite(bebeId: number, activite: ActiviteBebe): Observable<ActiviteBebe> {
  return this.http.post<ActiviteBebe>(
    `${this.apiUrl}/bebe/${bebeId}/activites`,
    activite,
    { headers: this.getHeaders() }
  );
}
getActivitesAujourdhuiAdmin(bebeId: number): Observable<ActiviteBebe[]> {
  return this.http.get<ActiviteBebe[]>(`${this.apiUrl}/bebe/${bebeId}/activites/aujourdhui`, { headers: this.getHeaders() });
}
getActiviteById(activiteId: number) {
  return this.http.get<ActiviteBebe>(
    `${this.apiUrl}/activites/${activiteId}`,
    { headers: this.getHeaders() }
  );
}
 updateActivite(id: number, activite: Partial<ActiviteBebe>): Observable<ActiviteBebe> {
    return this.http.put<ActiviteBebe>(`${this.apiUrl}/activites/${id}`, activite, {
      headers: this.getHeaders(),
    });
  }
  getProfilAdmin(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/profil`,
      { headers: this.getHeaders() }
    );
 
  }
  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}
ajouterBebe(parentId: number, bebe: any) {
  return this.http.post(
    `http://localhost:8082/admin/bebe/${parentId}`,
    bebe,
    { headers: this.getHeaders() }
  );
}
}
