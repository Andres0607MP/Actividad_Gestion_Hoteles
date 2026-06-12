import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div class="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 class="text-3xl font-bold text-slate-900 mb-4">Login</h1>
        <p class="text-sm text-slate-600 mb-6">Esta página está disponible desde la rama frontend.</p>
        <div class="space-y-3">
          <button
            routerLink="/dashboard"
            class="w-full rounded-xl bg-sky-600 px-4 py-3 text-white font-semibold hover:bg-sky-700 transition"
          >
            Ir al Dashboard (demo)
          </button>
        </div>
        <p class="mt-6 text-sm text-slate-500">
          ¿No tienes cuenta? <a routerLink="/register" class="text-sky-600 hover:underline">Regístrate</a>
        </p>
      </div>
    </section>
  `
})
export class LoginPage {}
