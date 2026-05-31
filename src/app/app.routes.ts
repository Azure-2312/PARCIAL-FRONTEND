// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '',       redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'principal', component: PrincipalComponent, canActivate: [authGuard] },
  { path: 'buscador',  component: BuscadorComponent,  canActivate: [authGuard] },
  { path: '**',     redirectTo: 'login' }
];
