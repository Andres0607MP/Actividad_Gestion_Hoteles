import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, authState } from '@angular/fire/auth';
import { signOut } from '@angular/fire/auth';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    @if (isAuthenticated$ | async) {
      <header class="border-b border-slate-200 bg-white shadow-sm">
        <div class="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <a routerLink="/dashboard" class="inline-flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600">
                  <i class="fas fa-hotel text-white text-lg"></i>
                </div>
                <span class="hidden text-lg font-semibold text-slate-900 sm:inline">Hotel Manager</span>
              </a>
            </div>
            <nav class="flex flex-wrap gap-1 text-sm">
              <a routerLink="/dashboard" routerLinkActive="bg-sky-100 text-sky-700" 
                 [routerLinkActiveOptions]="{ exact: true }"
                 class="rounded-full px-3 py-2 text-slate-700 transition hover:bg-slate-100">
                <i class="fas fa-chart-line mr-2"></i>Dashboard
              </a>
              <a routerLink="/hoteles" routerLinkActive="bg-sky-100 text-sky-700"
                 [routerLinkActiveOptions]="{ exact: true }"
                 class="rounded-full px-3 py-2 text-slate-700 transition hover:bg-slate-100">
                <i class="fas fa-building mr-2"></i>Hoteles
              </a>
              <a routerLink="/habitaciones" routerLinkActive="bg-sky-100 text-sky-700"
                 [routerLinkActiveOptions]="{ exact: true }"
                 class="rounded-full px-3 py-2 text-slate-700 transition hover:bg-slate-100">
                <i class="fas fa-bed mr-2"></i>Habitaciones
              </a>
              <a routerLink="/reservas" routerLinkActive="bg-sky-100 text-sky-700"
                 [routerLinkActiveOptions]="{ exact: true }"
                 class="rounded-full px-3 py-2 text-slate-700 transition hover:bg-slate-100">
                <i class="fas fa-calendar mr-2"></i>Reservas
              </a>
              <button
                (click)="logout()"
                class="ml-2 rounded-full px-3 py-2 bg-red-600 text-white font-medium transition hover:bg-red-700 active:scale-95 duration-150"
              >
                <i class="fas fa-sign-out-alt mr-2"></i>Salir
              </button>
            </nav>
          </div>
        </div>
      </header>
    }
  `,
})
export class NavbarComponent {
  private auth = inject(Auth);
  private router = inject(Router);
  private toastService = inject(ToastService);

  isAuthenticated$ = authState(this.auth);

  async logout() {
    try {
      await signOut(this.auth);
      this.toastService.success('Sesión cerrada correctamente');
      this.router.navigate(['/login']);
    } catch (error) {
      this.toastService.error('Error al cerrar sesión');
      console.error('Logout error:', error);
    }
  }
}
