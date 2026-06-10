import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
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
            <a routerLink="/login" routerLinkActive="bg-slate-100" 
               [routerLinkActiveOptions]="{ exact: true }"
               class="rounded-full px-3 py-2 text-slate-700 transition hover:bg-slate-100">
              Login
            </a>
            <a routerLink="/registro" routerLinkActive="bg-slate-100"
               [routerLinkActiveOptions]="{ exact: true }"
               class="rounded-full px-3 py-2 text-slate-700 transition hover:bg-slate-100">
              Registro
            </a>
            <a routerLink="/dashboard" routerLinkActive="bg-slate-100"
               [routerLinkActiveOptions]="{ exact: true }"
               class="rounded-full px-3 py-2 text-slate-700 transition hover:bg-slate-100">
              Dashboard
            </a>
            <a routerLink="/hoteles" routerLinkActive="bg-slate-100"
               [routerLinkActiveOptions]="{ exact: true }"
               class="rounded-full px-3 py-2 text-slate-700 transition hover:bg-slate-100">
              Hoteles
            </a>
            <a routerLink="/habitaciones" routerLinkActive="bg-slate-100"
               [routerLinkActiveOptions]="{ exact: true }"
               class="rounded-full px-3 py-2 text-slate-700 transition hover:bg-slate-100">
              Habitaciones
            </a>
            <a routerLink="/reservas" routerLinkActive="bg-slate-100"
               [routerLinkActiveOptions]="{ exact: true }"
               class="rounded-full px-3 py-2 text-slate-700 transition hover:bg-slate-100">
              Reservas
            </a>
          </nav>
        </div>
      </div>
    </header>
  `,
})
export class NavbarComponent {}
