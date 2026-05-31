// src/app/services/producto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private apiUrl = 'https://parcial-backend-jfka.onrender.com';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  buscarProducto(codigo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/producto/${codigo}`, {
      headers: this.headers()
    });
  }
}