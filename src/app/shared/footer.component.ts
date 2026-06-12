import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-slate-200 bg-slate-900 text-slate-100">
      <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Información de la Empresa -->
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <i class="fas fa-hotel text-2xl"></i>
              <span class="font-semibold">Hotel Manager</span>
            </div>
            <p class="text-sm text-slate-400">
              Plataforma completa para la gestión de hoteles, habitaciones y reservas.
            </p>
          </div>

          <!-- Enlaces Rápidos -->
          <div class="space-y-4">
            <h3 class="font-semibold">Acceso Rápido</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a routerLink="/dashboard" class="text-slate-400 transition hover:text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a routerLink="/hoteles" class="text-slate-400 transition hover:text-white">
                  Hoteles
                </a>
              </li>
              <li>
                <a routerLink="/habitaciones" class="text-slate-400 transition hover:text-white">
                  Habitaciones
                </a>
              </li>
              <li>
                <a routerLink="/reservas" class="text-slate-400 transition hover:text-white">
                  Reservas
                </a>
              </li>
            </ul>
          </div>

          <!-- Autenticación -->
          <div class="space-y-4">
            <h3 class="font-semibold">Autenticación</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a routerLink="/login" class="text-slate-400 transition hover:text-white">
                  Iniciar Sesión
                </a>
              </li>
              <li>
                <a routerLink="/registro" class="text-slate-400 transition hover:text-white">
                  Registrarse
                </a>
              </li>
            </ul>
          </div>

          <!-- Información Legal -->
          <div class="space-y-4">
            <h3 class="font-semibold">Legal</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="text-slate-400 transition hover:text-white">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" class="text-slate-400 transition hover:text-white">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" class="text-slate-400 transition hover:text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Divider -->
        <div class="my-8 border-t border-slate-700"></div>

        <!-- Copyright -->
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-400">
          <p>&copy; 2026 Hotel Manager. Todos los derechos reservados.</p>
          <div class="flex gap-4">
            <span>Desarrollado con Angular</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
