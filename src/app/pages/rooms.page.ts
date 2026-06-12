import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { HotelService } from '../services/hotel.service';
import { Room } from '../models/data.model';
import { Hotel } from '../models/data.model';

@Component({
  selector: 'app-rooms-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="min-h-[calc(100vh-16rem)] bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div class="mx-auto max-w-7xl space-y-6">
        <!-- Header -->
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900">Gestión de Habitaciones</h1>
            <p class="text-sm sm:text-base text-slate-600 mt-1">Administra todas las habitaciones de tus hoteles</p>
          </div>
          <button
            (click)="openAddModal()"
            class="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            <i class="fas fa-plus"></i>
            <span>Agregar Habitación</span>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="rounded-xl bg-white p-4 shadow-md">
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1 relative">
              <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (input)="onSearch()"
                placeholder="Buscar por número, tipo o hotel..."
                class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <select
              [(ngModel)]="filterAvailable"
              (change)="filterRooms()"
              class="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option [value]="null">Todas las habitaciones</option>
              <option [value]="true">Disponibles</option>
              <option [value]="false">Ocupadas</option>
            </select>
            <button
              (click)="resetFilters()"
              class="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition"
            >
              Limpiar
            </button>
          </div>
        </div>

        <!-- Rooms Table (Desktop) -->
        <div class="hidden sm:block rounded-xl bg-white shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-slate-900">Habitación</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-slate-900">Hotel</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-slate-900">Tipo</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-900">Capacidad</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-900">Precio</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-900">Estado</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-900">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                @for (room of filteredRooms; track room.id) {
                  <tr class="hover:bg-slate-50 transition">
                    <td class="px-4 py-3 text-sm font-medium text-slate-900">#{{ room.roomNumber }}</td>
                    <td class="px-4 py-3 text-sm text-slate-600">{{ getHotelName(room.hotelId) }}</td>
                    <td class="px-4 py-3 text-sm text-slate-600">{{ room.type | uppercase }}</td>
                    <td class="px-4 py-3 text-sm text-center text-slate-600">{{ room.capacity }} personas</td>
                    <td class="px-4 py-3 text-sm text-center font-semibold text-slate-900">\${{ room.price }}</td>
                    <td class="px-4 py-3 text-sm text-center">
                      <span class="px-3 py-1 rounded-full text-xs font-semibold" [ngClass]="{
                        'bg-green-100 text-green-700': room.available,
                        'bg-red-100 text-red-700': !room.available
                      }">
                        {{ room.available ? 'Disponible' : 'Ocupada' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm text-center">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          (click)="editRoom(room)"
                          class="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-semibold"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button
                          (click)="deleteRoom(room.id)"
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

        <!-- Rooms Cards (Mobile) -->
        <div class="sm:hidden space-y-4">
          @for (room of filteredRooms; track room.id) {
            <div class="rounded-lg bg-white shadow-md p-4">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="font-bold text-slate-900">Hab. #{{ room.roomNumber }}</h3>
                  <p class="text-xs text-slate-600">{{ getHotelName(room.hotelId) }}</p>
                </div>
                <span class="px-2 py-1 rounded-full text-xs font-semibold" [ngClass]="{
                  'bg-green-100 text-green-700': room.available,
                  'bg-red-100 text-red-700': !room.available
                }">
                  {{ room.available ? 'Disponible' : 'Ocupada' }}
                </span>
              </div>
              <div class="flex gap-2 text-xs text-slate-600 mb-3">
                <span><i class="fas fa-users mr-1"></i>{{ room.capacity }} personas</span>
                <span><i class="fas fa-dollar-sign mr-1"></i>\${{ room.price }}</span>
                <span><i class="fas fa-tag mr-1"></i>{{ room.type | uppercase }}</span>
              </div>
              <div class="flex gap-2">
                <button
                  (click)="editRoom(room)"
                  class="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-semibold"
                >
                  <i class="fas fa-edit mr-1"></i>Editar
                </button>
                <button
                  (click)="deleteRoom(room.id)"
                  class="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs font-semibold"
                >
                  <i class="fas fa-trash mr-1"></i>Eliminar
                </button>
              </div>
            </div>
          }
        </div>

        @if (filteredRooms.length === 0) {
          <div class="rounded-xl bg-white shadow-md p-8 text-center">
            <i class="fas fa-search text-4xl text-slate-300 mb-4 block"></i>
            <p class="text-slate-600">No se encontraron habitaciones</p>
          </div>
        }

        <!-- Add/Edit Modal -->
        @if (showModal) {
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 class="text-2xl font-bold text-slate-900 mb-4">
                {{ editingRoom ? 'Editar Habitación' : 'Agregar Habitación' }}
              </h2>

              <form (ngSubmit)="saveRoom()" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Hotel</label>
                  <select
                    [(ngModel)]="formData.hotelId"
                    name="hotelId"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  >
                    <option value="">Selecciona un hotel</option>
                    @for (hotel of hotels; track hotel.id) {
                      <option [value]="hotel.id">{{ hotel.name }}</option>
                    }
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Número de Habitación</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.roomNumber"
                    name="roomNumber"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Tipo de Habitación</label>
                  <select
                    [(ngModel)]="formData.type"
                    name="type"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  >
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="suite">Suite</option>
                    <option value="deluxe">Deluxe</option>
                  </select>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Capacidad</label>
                    <input
                      type="number"
                      [(ngModel)]="formData.capacity"
                      name="capacity"
                      min="1"
                      class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Precio/Noche</label>
                    <input
                      type="number"
                      [(ngModel)]="formData.price"
                      name="price"
                      min="0"
                      step="0.01"
                      class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label class="flex items-center gap-2">
                    <input
                      type="checkbox"
                      [(ngModel)]="formData.available"
                      name="available"
                      class="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-2 focus:ring-sky-500"
                    />
                    <span class="text-sm font-medium text-slate-700">Disponible</span>
                  </label>
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
                    {{ editingRoom ? 'Actualizar' : 'Crear' }}
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
export class RoomsPage implements OnInit {
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  hotels: Hotel[] = [];
  searchQuery = '';
  filterAvailable: boolean | null = null;
  showModal = false;
  editingRoom: Room | null = null;

  formData: any = {
    hotelId: '',
    roomNumber: '',
    type: 'single',
    capacity: 1,
    price: 0,
    available: true,
    amenities: []
  };

  constructor(
    private roomService: RoomService,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.loadRooms();
    this.loadHotels();
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
      this.filteredRooms = rooms;
    });
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe(hotels => {
      this.hotels = hotels;
    });
  }

  getHotelName(hotelId: string): string {
    return this.hotels.find(h => h.id === hotelId)?.name || 'Desconocido';
  }

  onSearch(): void {
    this.filterRooms();
  }

  filterRooms(): void {
    this.filteredRooms = this.rooms.filter(room => {
      const matchesSearch = !this.searchQuery.trim() ||
        room.roomNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        room.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.getHotelName(room.hotelId).toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesAvailable = this.filterAvailable === null || room.available === this.filterAvailable;

      return matchesSearch && matchesAvailable;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.filterAvailable = null;
    this.filteredRooms = this.rooms;
  }

  openAddModal(): void {
    this.editingRoom = null;
    this.formData = {
      hotelId: '',
      roomNumber: '',
      type: 'single',
      capacity: 1,
      price: 0,
      available: true,
      amenities: []
    };
    this.showModal = true;
  }

  editRoom(room: Room): void {
    this.editingRoom = room;
    this.formData = {
      hotelId: room.hotelId,
      roomNumber: room.roomNumber,
      type: room.type,
      capacity: room.capacity,
      price: room.price,
      available: room.available,
      amenities: room.amenities
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingRoom = null;
  }

  saveRoom(): void {
    if (this.editingRoom) {
      this.roomService.updateRoom(this.editingRoom.id, this.formData).subscribe(() => {
        this.loadRooms();
        this.closeModal();
      });
    } else {
      this.roomService.addRoom(this.formData as any).subscribe(() => {
        this.loadRooms();
        this.closeModal();
      });
    }
  }

  deleteRoom(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta habitación?')) {
      this.roomService.deleteRoom(id).subscribe(() => {
        this.loadRooms();
      });
    }
  }
}
