// src/app/pages/principal/principal.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  nombre = '';
  hora = '';
  private timer: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.nombre = this.auth.getNombre();
    this.updateTime();
    this.timer = setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    this.hora = new Date().toLocaleTimeString('es-PE', { hour12: true });
  }

  irBuscador() { this.router.navigate(['/buscador']); }

  salir() {
    this.auth.logout();
    clearInterval(this.timer);
    this.router.navigate(['/login']);
  }

  ngOnDestroy() { clearInterval(this.timer); }
}
