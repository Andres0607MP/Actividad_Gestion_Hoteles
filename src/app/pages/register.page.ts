import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-6">
      <div class="max-w-md w-full space-y-6 bg-white rounded-3xl shadow-lg p-8">
        <div>
          <h1 class="text-3xl font-semibold">Registro</h1>
          <p class="mt-2 text-sm text-slate-500">Crea una nueva cuenta para gestionar hoteles.</p>
        </div>
        <div class="grid gap-4">
          <div class="rounded-2xl border border-slate-200 p-4">
            <p class="text-sm text-slate-600">Esta página será el formulario de registro.</p>
          </div>
          <div class="flex flex-col gap-3">
            <a routerLink="/login" class="text-sm text-sky-600 hover:underline">Ya tengo cuenta</a>
            <a routerLink="/dashboard" class="inline-flex justify-center rounded-full bg-sky-600 px-4 py-2 text-white shadow hover:bg-sky-700">Ir al Dashboard</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class RegisterPage {}
