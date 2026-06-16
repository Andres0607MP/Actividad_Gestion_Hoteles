import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService, Reservation } from '../services/reservation.service';

@Component({
  selector: 'app-reservations-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="min-h-[calc(100vh-16rem)] bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div class="mx-auto max-w-7xl space-y-6">
        <!-- Header -->
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900">Gestión de Reservas</h1>
            <p class="text-sm sm:text-base text-slate-600 mt-1">Administra todas las reservas de tus hoteles</p>
          </div>
          <button
            (click)="openAddModal()"
            class="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            <i class="fas fa-plus"></i>
            <span>Nueva Reserva</span>
          </button>
        </div>

        <!-- Search & Filter Bar -->
        <div class="rounded-xl bg-white p-4 shadow-md">
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1 relative">
              <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (input)="onSearch()"
                placeholder="Buscar por nombre de huésped o email..."
                class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <select
              [(ngModel)]="filterStatus"
              (change)="filterReservations()"
              class="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              (click)="resetFilters()"
              class="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition"
            >
              Limpiar
            </button>
          </div>
        </div>

        <!-- Reservations Table (Desktop) -->
        <div class="hidden sm:block rounded-xl bg-white shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-slate-900">Huésped</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-900">Check-in</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-900">Check-out</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-900">Total</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-900">Estado</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-900">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                @for (reservation of filteredReservations; track reservation.id) {
                  <tr class="hover:bg-slate-50 transition">
                    <td class="px-4 py-3 text-sm font-medium text-slate-900">{{ reservation.guestName }}</td>
                    <td class="px-4 py-3 text-sm text-slate-600">{{ reservation.guestEmail }}</td>
                    <td class="px-4 py-3 text-sm text-center text-slate-600">{{ formatDate(reservation.checkInDate) }}</td>
                    <td class="px-4 py-3 text-sm text-center text-slate-600">{{ formatDate(reservation.checkOutDate) }}</td>
                    <td class="px-4 py-3 text-sm text-center font-semibold text-slate-900">\${{ reservation.totalPrice }}</td>
                    <td class="px-4 py-3 text-sm text-center">
                      <span class="px-3 py-1 rounded-full text-xs font-semibold" [ngClass]="{
                        'bg-green-100 text-green-700': reservation.status === 'confirmed',
                        'bg-yellow-100 text-yellow-700': reservation.status === 'pending',
                        'bg-red-100 text-red-700': reservation.status === 'cancelled'
                      }">
                        {{ capitalize(reservation.status) }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm text-center">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          (click)="editReservation(reservation)"
                          class="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-semibold"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button
                          (click)="deleteReservation(reservation.id)"
                          class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs font-semibold"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Reservations Cards (Mobile) -->
        <div class="sm:hidden space-y-4">
          @for (reservation of filteredReservations; track reservation.id) {
            <div class="rounded-lg bg-white shadow-md p-4">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="font-bold text-slate-900">{{ reservation.guestName }}</h3>
                  <p class="text-xs text-slate-600">{{ reservation.guestEmail }}</p>
                </div>
                <span class="px-2 py-1 rounded-full text-xs font-semibold" [ngClass]="{
                  'bg-green-100 text-green-700': reservation.status === 'confirmed',
                  'bg-yellow-100 text-yellow-700': reservation.status === 'pending',
                  'bg-red-100 text-red-700': reservation.status === 'cancelled'
                }">
                  {{ capitalize(reservation.status) }}
                </span>
              </div>
              <div class="flex flex-col gap-2 text-xs text-slate-600 mb-3">
                <span><i class="fas fa-calendar-check mr-1"></i>Entrada: {{ formatDate(reservation.checkInDate) }}</span>
                <span><i class="fas fa-calendar-times mr-1"></i>Salida: {{ formatDate(reservation.checkOutDate) }}</span>
                <span><i class="fas fa-dollar-sign mr-1"></i>Total: \${{ reservation.totalPrice }}</span>
              </div>
              <div class="flex gap-2">
                <button
                  (click)="editReservation(reservation)"
                  class="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-semibold"
                >
                  <i class="fas fa-edit mr-1"></i>Editar
                </button>
                <button
                  (click)="deleteReservation(reservation.id)"
                  class="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs font-semibold"
                >
                  <i class="fas fa-trash mr-1"></i>Eliminar
                </button>
              </div>
            </div>
          }
        </div>

        @if (filteredReservations.length === 0) {
          <div class="rounded-xl bg-white shadow-md p-8 text-center">
            <i class="fas fa-search text-4xl text-slate-300 mb-4 block"></i>
            <p class="text-slate-600">No se encontraron reservas</p>
          </div>
        }

        <!-- Add/Edit Modal -->
        @if (showModal) {
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 class="text-2xl font-bold text-slate-900 mb-4">
                {{ editingReservation ? 'Editar Reserva' : 'Nueva Reserva' }}
              </h2>

              <form (ngSubmit)="saveReservation()" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Nombre del Huésped</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.guestName"
                    name="guestName"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Email del Huésped</label>
                  <input
                    type="email"
                    [(ngModel)]="formData.guestEmail"
                    name="guestEmail"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Habitación</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.roomId"
                    name="roomId"
                    placeholder="ID de la habitación"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Hotel</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.hotelId"
                    name="hotelId"
                    placeholder="ID del hotel"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Check-in</label>
                    <input
                      type="date"
                      [(ngModel)]="formData.checkInDate"
                      name="checkInDate"
                      class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Check-out</label>
                    <input
                      type="date"
                      [(ngModel)]="formData.checkOutDate"
                      name="checkOutDate"
                      class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Total</label>
                  <input
                    type="number"
                    [(ngModel)]="formData.totalPrice"
                    name="totalPrice"
                    min="0"
                    step="0.01"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    [(ngModel)]="formData.status"
                    name="status"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div class="flex gap-3 pt-4">
                  <button
                    type="button"
                    (click)="closeModal()"
                    class="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    class="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-semibold"
                  >
                    {{ editingReservation ? 'Actualizar' : 'Crear' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class ReservationsPage implements OnInit {
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  searchQuery = '';
  filterStatus = '';
  showModal = false;
  editingReservation: Reservation | null = null;

  formData: any = {
    guestName: '',
    guestEmail: '',
    roomId: '',
    hotelId: '',
    checkInDate: new Date().toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    totalPrice: 0,
    status: 'pending'
  };

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
      this.filteredReservations = reservations;
    });
  }

  onSearch(): void {
    this.filterReservations();
  }

  filterReservations(): void {
    this.filteredReservations = this.reservations.filter(reservation => {
      const matchesSearch = !this.searchQuery.trim() ||
        reservation.guestName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        reservation.guestEmail.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus = !this.filterStatus ||
        reservation.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.filterStatus = '';
    this.filteredReservations = this.reservations;
  }

  openAddModal(): void {
    this.editingReservation = null;
    this.formData = {
      guestName: '',
      guestEmail: '',
      roomId: '',
      hotelId: '',
      checkInDate: new Date().toISOString().split('T')[0],
      checkOutDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      totalPrice: 0,
      status: 'pending'
    };
    this.showModal = true;
  }

  editReservation(reservation: Reservation): void {
    this.editingReservation = reservation;
    this.formData = {
      guestName: reservation.guestName,
      guestEmail: reservation.guestEmail,
      roomId: reservation.roomId,
      hotelId: reservation.hotelId,
      checkInDate: new Date(reservation.checkInDate).toISOString().split('T')[0],
      checkOutDate: new Date(reservation.checkOutDate).toISOString().split('T')[0],
      totalPrice: reservation.totalPrice,
      status: (reservation.status === 'completed' ? 'confirmed' : reservation.status)
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingReservation = null;
  }

  saveReservation(): void {
    const data = {
      ...this.formData,
      checkInDate: new Date(this.formData.checkInDate),
      checkOutDate: new Date(this.formData.checkOutDate)
    };

    if (this.editingReservation) {
      this.reservationService.updateReservation(this.editingReservation.id, data).subscribe(() => {
        this.loadReservations();
        this.closeModal();
      });
    } else {
      this.reservationService.addReservation(data as Reservation).subscribe(() => {
        this.loadReservations();
        this.closeModal();
      });
    }
  }

  deleteReservation(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      this.reservationService.deleteReservation(id).subscribe(() => {
        this.loadReservations();
      });
    }
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
  }

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
