import { provideRouter, RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Inscrire } from './inscrire/inscrire';
import { Auth } from './services/auth';
import { Adminn } from './admin/admin';
import { Parent } from './parent/parent';
import { provideHttpClient } from '@angular/common/http';
import { authGuard } from './services/auth-guard';
import { ActivitesAujourdhui } from './activites-aujourdhui/activites-aujourdhui';
import { ActiviteMaintenant } from './activite-maintenant/activite-maintenant';
import { ModifierProfil } from './parent/modifier-profil/modifier-profil';
import { adminGuard } from './services/admin-guard';
import { AdminParents } from './admin/admin-parents/admin-parents';
import { AdminBebes } from './admin/admin-bebes/admin-bebes';
import { AdminAdmins } from './admin/admin-admins/admin-admins';
import { AdminActivites } from './admin/admin-activites/admin-activites';
import { ModifierBebe } from './modifier-bebe/modifier-bebe';
import { AjouterActivite } from './admin/ajouter-activite/ajouter-activite';
import { ModifierActivite } from './admin/modifier-activite/modifier-activite';
import { AjouterBebe } from './admin/ajouter-bebe/ajouter-bebe';
export const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'inscrire', component: Inscrire },
  { path: 'parent', component: Parent, canActivate: [authGuard] },
  { path: 'modifier-profil', component: ModifierProfil, canActivate: [authGuard] },
  { path: 'activites-aujourdhui/:bebeId', component: ActivitesAujourdhui, canActivate: [authGuard] },
  { path: 'activite-maintenant/:bebeId', component: ActiviteMaintenant, canActivate: [authGuard] },
{ path: 'admin', component: Adminn, canActivate: [adminGuard] },
{ path: 'admin/parents', component: AdminParents, canActivate: [authGuard] },
{ path: 'admin/bebes', component: AdminBebes, canActivate: [authGuard] },
{ path: 'admin/activites', component: AdminActivites, canActivate: [authGuard] },
{ path: 'admin/admins', component: AdminAdmins, canActivate: [authGuard] },
{ path: 'modifier-profil/:id', component: ModifierProfil, canActivate: [adminGuard] },
  { path: 'admin-bebes/:parentId', component: AdminBebes },
{ path: 'admin/activites-aujourdhui/:bebeId', component: ActivitesAujourdhui,canActivate: [adminGuard] },
{ path: 'modifier-bebe/:id', component: ModifierBebe },
  { path: 'ajouter-activite/:id', component: AjouterActivite },
{ path: 'admin/activites', component: AdminActivites, canActivate: [authGuard] },
{ 
  path: 'admin/modifier-activite/:id', 
  component: ModifierActivite,
  canActivate: [adminGuard]
},
  {path: 'admin/ajouter-bebe/:parentId',
  component: AjouterBebe,canActivate: [adminGuard]
},
  { path: '**', redirectTo: 'login' },
  

];

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};