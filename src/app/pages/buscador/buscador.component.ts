// src/app/pages/buscador/buscador.component.ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  codigo = '';
  producto: any = null;
  errorMsg = '';
  loading = false;
  buscado = false;

  constructor(
    private productoSvc: ProductoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  buscar() {
    this.errorMsg = '';
    this.producto = null;
    this.buscado = false;
    const cod = this.codigo.trim().toUpperCase();
    if (!cod) { this.errorMsg = 'Ingrese un código de producto.'; return; }

    this.loading = true;
    this.cdr.detectChanges();

    this.productoSvc.buscarProducto(cod).subscribe({
      next: (data) => {
        this.producto = data;
        this.loading = false;
        this.buscado = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.buscado = true;
        this.errorMsg = err.error?.error || 'Producto no encontrado.';
        this.cdr.detectChanges();
      }
    });
  }

  limpiar() {
    this.codigo = '';
    this.producto = null;
    this.errorMsg = '';
    this.buscado = false;
    this.cdr.detectChanges();
  }

  regresar() { this.router.navigate(['/principal']); }
}