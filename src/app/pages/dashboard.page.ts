import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface StatCard {
  title: string;
  value: number;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  link: string;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="min-h-[calc(100vh-16rem)] bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div class="mx-auto max-w-7xl space-y-8">
        <!-- Header -->
        <header class="space-y-6">
          <div class="space-y-2">
            <h1 class="text-4xl font-bold text-slate-900">
              Bienvenido al Dashboard
            </h1>
            <p class="text-lg text-slate-600">
              Gestiona tus hoteles, habitaciones y reservas desde aquí
            </p>
          </div>

          <!-- Quick Stats Overview -->
          <div class="rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 p-8 text-white shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-sky-100">Estado del sistema</p>
                <h2 class="text-3xl font-bold">Todo está en línea</h2>
                <p class="mt-2 text-sky-100">Tu plataforma funciona perfectamente</p>
              </div>
              <i class="fas fa-check-circle text-6xl text-green-300 opacity-80"></i>
            </div>
          </div>
        </header>

        <!-- Statistics Cards Grid -->
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (stat of stats; track stat.title) {
            <div
              [routerLink]="stat.link"
              class="group cursor-pointer rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl hover:scale-105"
            >
              <!-- Icon -->
              <div
                [class]="'h-12 w-12 rounded-xl flex items-center justify-center text-xl font-semibold text-white mb-4 group-hover:scale-110 transition ' + stat.bgColor"
              >
                <i [class]="stat.icon"></i>
              </div>

              <!-- Title -->
              <h3 class="text-sm font-medium text-slate-600 mb-1">{{ stat.title }}</h3>

              <!-- Value -->
              <div class="mb-2">
                <p [class]="'text-3xl font-bold ' + stat.color">
                  {{ stat.value }}
                </p>
              </div>

              <!-- Description -->
              <p class="text-xs text-slate-500 mb-3">{{ stat.description }}</p>

              <!-- Arrow indicator -->
              <div class="flex items-center text-xs font-semibold transition group-hover:translate-x-1">
                <span [class]="stat.color">Ver más</span>
                <i class="fas fa-arrow-right ml-2" [class]="stat.color"></i>
              </div>
            </div>
          }
        </div>

        <!-- Recent Activity Section -->
        <div class="rounded-2xl bg-white p-8 shadow-md">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold text-slate-900">Actividad reciente</h2>
              <p class="text-sm text-slate-600 mt-1">Últimas acciones en tu plataforma</p>
            </div>
            <a href="#" class="text-sky-600 font-semibold hover:underline flex items-center gap-2">
              Ver todo
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>

          <div class="space-y-3 border-t border-slate-200 pt-6">
            @for (item of activities; track item.id) {
              <div class="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition">
                <div class="flex items-center gap-4">
                  <div class="w-2 h-2 rounded-full" [class]="item.color"></div>
                  <div>
                    <p class="font-medium text-slate-900">{{ item.title }}</p>
                    <p class="text-xs text-slate-500">{{ item.time }}</p>
                  </div>
                </div>
                <i [class]="item.icon + ' text-slate-400'"></i>
              </div>
            }
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="rounded-2xl bg-white p-8 shadow-md">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">Acciones rápidas</h2>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button
              routerLink="/hoteles"
              class="flex items-center gap-3 rounded-lg bg-sky-50 p-4 text-left hover:bg-sky-100 transition border border-sky-200"
            >
              <i class="fas fa-hotel text-2xl text-sky-600"></i>
              <div>
                <p class="font-semibold text-slate-900">Gestionar Hoteles</p>
                <p class="text-xs text-slate-600">Agregar o editar hoteles</p>
              </div>
            </button>

            <button
              routerLink="/habitaciones"
              class="flex items-center gap-3 rounded-lg bg-emerald-50 p-4 text-left hover:bg-emerald-100 transition border border-emerald-200"
            >
              <i class="fas fa-door-open text-2xl text-emerald-600"></i>
              <div>
                <p class="font-semibold text-slate-900">Gestionar Habitaciones</p>
                <p class="text-xs text-slate-600">Administrar disponibilidad</p>
              </div>
            </button>

            <button
              routerLink="/reservas"
              class="flex items-center gap-3 rounded-lg bg-purple-50 p-4 text-left hover:bg-purple-100 transition border border-purple-200"
            >
              <i class="fas fa-calendar-alt text-2xl text-purple-600"></i>
              <div>
                <p class="font-semibold text-slate-900">Gestionar Reservas</p>
                <p class="text-xs text-slate-600">Ver y editar reservas</p>
              </div>
            </button>

            <button
              class="flex items-center gap-3 rounded-lg bg-orange-50 p-4 text-left hover:bg-orange-100 transition border border-orange-200"
            >
              <i class="fas fa-chart-line text-2xl text-orange-600"></i>
              <div>
                <p class="font-semibold text-slate-900">Reportes</p>
                <p class="text-xs text-slate-600">Ver estadísticas</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class DashboardPage implements OnInit {
  stats: StatCard[] = [];
  activities: any[] = [];

  ngOnInit(): void {
    this.initializeStats();
    this.initializeActivities();
  }

  initializeStats(): void {
    this.stats = [
      {
        title: 'Hoteles',
        value: 12,
        description: 'Hoteles activos en el sistema',
        icon: 'fas fa-hotel',
        color: 'text-sky-600',
        bgColor: 'bg-sky-600',
        link: '/hoteles'
      },
      {
        title: 'Habitaciones',
        value: 287,
        description: 'Habitaciones disponibles',
        icon: 'fas fa-door-open',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-600',
        link: '/habitaciones'
      },
      {
        title: 'Reservas',
        value: 45,
        description: 'Reservas activas este mes',
        icon: 'fas fa-calendar-alt',
        color: 'text-purple-600',
        bgColor: 'bg-purple-600',
        link: '/reservas'
      },
      {
        title: 'Huéspedes',
        value: 156,
        description: 'Huéspedes registrados',
        icon: 'fas fa-users',
        color: 'text-orange-600',
        bgColor: 'bg-orange-600',
        link: '/dashboard'
      }
    ];
  }

  initializeActivities(): void {
    this.activities = [
      {
        id: 1,
        title: 'Nueva reserva confirmada',
        time: 'Hace 2 horas',
        icon: 'fas fa-check',
        color: 'bg-green-500'
      },
      {
        id: 2,
        title: 'Habitación agregada al Hotel Plaza',
        time: 'Hace 5 horas',
        icon: 'fas fa-plus',
        color: 'bg-blue-500'
      },
      {
        id: 3,
        title: 'Huésped registrado: Juan Pérez',
        time: 'Hace 1 día',
        icon: 'fas fa-user-plus',
        color: 'bg-purple-500'
      },
      {
        id: 4,
        title: 'Reserva cancelada',
        time: 'Hace 2 días',
        icon: 'fas fa-times',
        color: 'bg-red-500'
      }
    ];
  }
}

