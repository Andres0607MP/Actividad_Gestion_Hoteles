import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-screen bg-slate-100 text-slate-900 p-6">
      <div class="mx-auto max-w-5xl space-y-8">
        <header class="flex flex-col gap-3 rounded-3xl bg-white p-8 shadow-sm">
          <div class="flex flex-col gap-2">
            <h1 class="text-3xl font-semibold">Dashboard</h1>
            <p class="text-slate-600">Resumen de la aplicación y acceso rápido a las secciones.</p>
          </div>
          <nav class="flex flex-wrap gap-3">
            <a routerLink="/hoteles" class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Hoteles</a>
            <a routerLink="/habitaciones" class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Habitaciones</a>
            <a routerLink="/reservas" class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Reservas</a>
          </nav>
        </header>

        <div class="grid gap-6 md:grid-cols-3">
          <div class="rounded-3xl bg-white p-6 shadow-sm"> <h2 class="text-xl font-semibold">Usuarios</h2> <p class="mt-2 text-slate-600">Tarjeta de estadísticas.</p> </div>
          <div class="rounded-3xl bg-white p-6 shadow-sm"> <h2 class="text-xl font-semibold">Hoteles</h2> <p class="mt-2 text-slate-600">Tarjeta de estadísticas.</p> </div>
          <div class="rounded-3xl bg-white p-6 shadow-sm"> <h2 class="text-xl font-semibold">Reservas</h2> <p class="mt-2 text-slate-600">Tarjeta de estadísticas.</p> </div>
        </div>
      </div>
    </section>
  `,
})
export class DashboardPage {}
