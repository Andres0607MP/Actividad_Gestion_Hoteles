import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rooms-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-screen bg-slate-100 text-slate-900 p-6">
      <div class="mx-auto max-w-5xl space-y-8">
        <header class="rounded-3xl bg-white p-8 shadow-sm">
          <div class="flex flex-col gap-2">
            <h1 class="text-3xl font-semibold">Habitaciones</h1>
            <p class="text-slate-600">Gestiona las habitaciones disponibles.</p>
          </div>
        </header>

        <div class="rounded-3xl bg-white p-6 shadow-sm">
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <span class="text-slate-700">Panel de habitaciones con filtros.</span>
            <a routerLink="/dashboard" class="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-white hover:bg-slate-800">Volver al Dashboard</a>
          </div>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div class="rounded-3xl border border-slate-200 p-6">Habitación ejemplo A</div>
            <div class="rounded-3xl border border-slate-200 p-6">Habitación ejemplo B</div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class RoomsPage {}
