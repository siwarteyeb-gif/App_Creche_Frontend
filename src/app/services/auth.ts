import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Bebe } from "../models/bebe";
import { ActiviteBebe } from "../models/activiteBebe";

@Injectable({ providedIn: 'root' })
export class Auth {
  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getBebes(): Observable<Bebe[]> {
    const token = this.getToken();
    if (!token) throw new Error('Token non trouvé');

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<Bebe[]>(`${this.apiUrl}/bebes`, { headers });
  }

  
getActivitesAujourdhui(bebeId: number): Observable<any[]> {
  const token = this.getToken();
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  return this.http.get<any[]>(`${this.apiUrl}/bebes/${bebeId}/activites`, { headers });
}


getActiviteMaintenant(bebeId: number): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  return this.http.get<any>(`${this.apiUrl}/bebes/${bebeId}/activite-maintenant`, { headers });
}
getParent(): Observable<any> {
  const token = this.getToken();
  if (!token) throw new Error('Token non trouvé');

  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  return this.http.get<any>(`${this.apiUrl}/parent/me`, { headers });
}

modifierParent(parentData: any): Observable<any> {
  const token = this.getToken();
  if (!token) throw new Error('Token non trouvé');

  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  return this.http.put<any>(`${this.apiUrl}/modifier`, parentData, { headers });
}
inscrire(parent: any) {
  return this.http.post(`${this.apiUrl}/inscrire`, parent);
}
getAllParents(): Observable<any[]> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<any[]>(`${this.apiUrl}/admin/parents`, { headers });
}
 getActivitesOfBebe(bebeId: number): Observable<ActiviteBebe[]> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<ActiviteBebe[]>(
      `http://localhost:8082/admin/bebe/${bebeId}/activites`, 
      { headers }
    );
  }
 getUser() {
  const token = this.getToken();
  const role = this.getRole();
  if (!token || !role) return null;

  return { role, token };
}
isAdmin(): boolean {
    return localStorage.getItem('role') === 'ROLE_ADMIN';
  }
}