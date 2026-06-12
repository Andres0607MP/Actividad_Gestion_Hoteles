import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HotelService } from '../services/hotel.service';
import { RoomService } from '../services/room.service';
import { ReservationService } from '../services/reservation.service';
import { Hotel, Room, Reservation } from '../models/data.model';

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
              <h2 class="text-2xl font-bold text-slate-900">Hoteles Recientes</h2>
              <p class="text-sm text-slate-600 mt-1">Últimos hoteles agregados al sistema</p>
            </div>
            <a [routerLink]="'/hoteles'" class="text-sky-600 font-semibold hover:underline flex items-center gap-2">
              Ver todos
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>

          <div class="space-y-3 border-t border-slate-200 pt-6">
            @for (hotel of recentHotels; track hotel.id) {
              <div class="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition">
                <div class="flex items-center gap-4">
                  <i class="fas fa-hotel text-2xl text-sky-600"></i>
                  <div>
                    <p class="font-medium text-slate-900">{{ hotel.name }}</p>
                    <p class="text-xs text-slate-500">{{ hotel.city }}, {{ hotel.country }} • {{ hotel.rooms }} habitaciones</p>
                  </div>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fas fa-star text-yellow-400 text-sm"></i>
                  <span class="text-sm font-semibold text-slate-600">{{ hotel.rating }}</span>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Recent Reservations Section -->
        <div class="rounded-2xl bg-white p-8 shadow-md">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold text-slate-900">Reservas Confirmadas</h2>
              <p class="text-sm text-slate-600 mt-1">Últimas reservas confirmadas</p>
            </div>
            <a [routerLink]="'/reservas'" class="text-sky-600 font-semibold hover:underline flex items-center gap-2">
              Ver todas
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>

          <div class="space-y-3 border-t border-slate-200 pt-6">
            @for (reservation of recentReservations; track reservation.id) {
              <div class="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition">
                <div class="flex items-center gap-4">
                  <i class="fas fa-calendar-check text-2xl text-emerald-600"></i>
                  <div>
                    <p class="font-medium text-slate-900">{{ reservation.guestName }}</p>
                    <p class="text-xs text-slate-500">{{ formatDate(reservation.checkInDate) }} - {{ formatDate(reservation.checkOutDate) }}</p>
                  </div>
                </div>
                <span class="text-sm font-semibold text-slate-600">\${{ reservation.totalPrice }}</span>
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
  recentHotels: Hotel[] = [];
  recentReservations: Reservation[] = [];

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentItems();
  }

  loadStats(): void {
    this.hotelService.getHotels().subscribe(hotels => {
      this.roomService.getRooms().subscribe(rooms => {
        this.reservationService.getReservations().subscribe(reservations => {
          const confirmedReservations = reservations.filter(r => r.status === 'confirmed');
          const availableRooms = rooms.filter(r => r.available).length;

          this.stats = [
            {
              title: 'Hoteles',
              value: hotels.length,
              description: 'Hoteles activos en el sistema',
              icon: 'fas fa-hotel',
              color: 'text-sky-600',
              bgColor: 'bg-sky-600',
              link: '/hoteles'
            },
            {
              title: 'Habitaciones',
              value: availableRooms,
              description: 'Habitaciones disponibles',
              icon: 'fas fa-door-open',
              color: 'text-emerald-600',
              bgColor: 'bg-emerald-600',
              link: '/habitaciones'
            },
            {
              title: 'Reservas',
              value: confirmedReservations.length,
              description: 'Reservas confirmadas',
              icon: 'fas fa-calendar-alt',
              color: 'text-purple-600',
              bgColor: 'bg-purple-600',
              link: '/reservas'
            },
            {
              title: 'Total Ingresos',
              value: Math.floor(confirmedReservations.reduce((sum, r) => sum + r.totalPrice, 0)),
              description: 'Ingresos por reservas',
              icon: 'fas fa-dollar-sign',
              color: 'text-orange-600',
              bgColor: 'bg-orange-600',
              link: '/dashboard'
            }
          ];
        });
      });
    });
  }

  loadRecentItems(): void {
    this.hotelService.getHotels().subscribe(hotels => {
      this.recentHotels = hotels.slice(0, 4);
    });

    this.reservationService.getReservations().subscribe(reservations => {
      this.recentReservations = reservations
        .filter(r => r.status === 'confirmed')
        .slice(0, 4);
    });
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
  }
}

