import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { RoomService } from '../services/room.service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="min-h-[calc(100vh-16rem)] bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div class="mx-auto max-w-7xl space-y-6">
        <!-- Header -->
        <div class="rounded-2xl bg-gradient-to-r from-sky-600 to-sky-700 p-6 sm:p-8 text-white shadow-lg">
          <div class="flex flex-col gap-3 mb-6">
            <h1 class="text-3xl sm:text-4xl font-bold">Dashboard</h1>
            <p class="text-sky-100 text-sm sm:text-base">Bienvenido, aquí puedes ver un resumen de tu sistema de gestión.</p>
          </div>
          <nav class="flex flex-wrap gap-2 sm:gap-3">
            <a routerLink="/hoteles" class="rounded-lg bg-white/20 hover:bg-white/30 px-4 py-2 text-xs sm:text-sm font-semibold transition">
              <i class="fas fa-hotel mr-2"></i>Hoteles
            </a>
            <a routerLink="/habitaciones" class="rounded-lg bg-white/20 hover:bg-white/30 px-4 py-2 text-xs sm:text-sm font-semibold transition">
              <i class="fas fa-door-open mr-2"></i>Habitaciones
            </a>
            <a routerLink="/reservas" class="rounded-lg bg-white/20 hover:bg-white/30 px-4 py-2 text-xs sm:text-sm font-semibold transition">
              <i class="fas fa-calendar-alt mr-2"></i>Reservas
            </a>
          </nav>
        </div>

        <!-- Statistics Grid -->
        <div class="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          <!-- Hoteles Card -->
          <div class="rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-semibold text-slate-600">Total de Hoteles</h3>
              <div class="bg-emerald-100 rounded-lg p-3">
                <i class="fas fa-hotel text-xl text-emerald-600"></i>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-3xl font-bold text-slate-900">{{ totalHotels }}</p>
              <p class="text-xs text-slate-500">Hoteles en el sistema</p>
            </div>
          </div>

          <!-- Habitaciones Card -->
          <div class="rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-semibold text-slate-600">Habitaciones Disponibles</h3>
              <div class="bg-orange-100 rounded-lg p-3">
                <i class="fas fa-door-open text-xl text-orange-600"></i>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-3xl font-bold text-slate-900">{{ totalRoomsAvailable }}</p>
              <p class="text-xs text-slate-500">De {{ totalRooms }} habitaciones</p>
            </div>
          </div>

          <!-- Reservas Card -->
          <div class="rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-semibold text-slate-600">Total de Reservas</h3>
              <div class="bg-purple-100 rounded-lg p-3">
                <i class="fas fa-calendar-alt text-xl text-purple-600"></i>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-3xl font-bold text-slate-900">{{ totalReservations }}</p>
              <p class="text-xs text-slate-500">Reservas en el sistema</p>
            </div>
          </div>

          <!-- Confirmadas Card -->
          <div class="rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-semibold text-slate-600">Reservas Confirmadas</h3>
              <div class="bg-green-100 rounded-lg p-3">
                <i class="fas fa-check-circle text-xl text-green-600"></i>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-3xl font-bold text-slate-900">{{ confirmedReservations }}</p>
              <p class="text-xs text-slate-500">Confirmadas este mes</p>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <!-- Recent Hotels -->
          <div class="rounded-2xl bg-white p-6 shadow-md">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-slate-900">Hoteles Recientes</h3>
              <a routerLink="/hoteles" class="text-xs text-sky-600 hover:underline">Ver todos</a>
            </div>
            <div class="space-y-3">
              @if (recentHotels.length > 0) {
                @for (hotel of recentHotels.slice(0, 3); track hotel.id) {
                  <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p class="font-semibold text-slate-900 text-sm">{{ hotel.name }}</p>
                      <p class="text-xs text-slate-600">{{ hotel.city }}, {{ hotel.country }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                      <i class="fas fa-star text-yellow-400 text-xs"></i>
                      <span class="text-sm font-semibold">{{ hotel.rating }}</span>
                    </div>
                  </div>
                }
              } @else {
                <p class="text-sm text-slate-500 text-center py-4">Sin hoteles registrados</p>
              }
            </div>
          </div>

          <!-- Recent Reservations -->
          <div class="rounded-2xl bg-white p-6 shadow-md">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-slate-900">Reservas Recientes</h3>
              <a routerLink="/reservas" class="text-xs text-sky-600 hover:underline">Ver todas</a>
            </div>
            <div class="space-y-3">
              @if (recentReservations.length > 0) {
                @for (reservation of recentReservations.slice(0, 3); track reservation.id) {
                  <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p class="font-semibold text-slate-900 text-sm">{{ reservation.guestName }}</p>
                      <p class="text-xs text-slate-600">{{ reservation.guestEmail }}</p>
                    </div>
                    <span class="text-xs font-semibold px-2 py-1 rounded-full" [ngClass]="{
                      'bg-green-100 text-green-700': reservation.status === 'confirmed',
                      'bg-yellow-100 text-yellow-700': reservation.status === 'pending',
                      'bg-red-100 text-red-700': reservation.status === 'cancelled'
                    }">
                      {{ reservation.status | uppercase }}
                    </span>
                  </div>
                }
              } @else {
                <p class="text-sm text-slate-500 text-center py-4">Sin reservas registradas</p>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class DashboardPage implements OnInit {
  totalHotels = 0;
  totalRooms = 0;
  totalRoomsAvailable = 0;
  totalReservations = 0;
  confirmedReservations = 0;
  recentHotels: any[] = [];
  recentReservations: any[] = [];

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    // Load hotels
    this.hotelService.getHotels().subscribe(hotels => {
      this.totalHotels = hotels.length;
      this.recentHotels = hotels;
    });

    // Load rooms
    this.roomService.getRooms().subscribe(rooms => {
      this.totalRooms = rooms.length;
      this.totalRoomsAvailable = rooms.filter(r => r.available).length;
    });

    // Load reservations
    this.reservationService.getReservations().subscribe(reservations => {
      this.totalReservations = reservations.length;
      this.confirmedReservations = reservations.filter(r => r.status === 'confirmed').length;
      this.recentReservations = reservations.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
  }
}
