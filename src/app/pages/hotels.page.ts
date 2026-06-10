import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelService, Hotel } from '../services/hotel.service';

@Component({
  selector: 'app-hotels-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="min-h-[calc(100vh-16rem)] bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div class="mx-auto max-w-7xl space-y-6">
        <!-- Header -->
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-900">Gestión de Hoteles</h1>
            <p class="text-sm sm:text-base text-slate-600 mt-1">Administra todos tus hoteles desde aquí</p>
          </div>
          <button
            (click)="openAddModal()"
            class="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            <i class="fas fa-plus"></i>
            <span>Agregar Hotel</span>
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
                placeholder="Buscar por nombre, ciudad o país..."
                class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <button
              (click)="resetSearch()"
              class="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition"
            >
              Limpiar
            </button>
          </div>
        </div>

        <!-- Hotels Table (Desktop) -->
        <div class="hidden sm:block rounded-xl bg-white shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-slate-900">Hotel</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-slate-900">Ubicación</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-900">Habitaciones</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-900">Rating</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-slate-900">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                @for (hotel of filteredHotels; track hotel.id) {
                  <tr class="hover:bg-slate-50 transition">
                    <td class="px-4 py-3 text-sm font-medium text-slate-900">{{ hotel.name }}</td>
                    <td class="px-4 py-3 text-sm text-slate-600">{{ hotel.city }}, {{ hotel.country }}</td>
                    <td class="px-4 py-3 text-sm text-center text-slate-600">{{ hotel.rooms }}</td>
                    <td class="px-4 py-3 text-sm text-center">
                      <div class="flex items-center justify-center gap-1">
                        <i class="fas fa-star text-yellow-400"></i>
                        <span class="font-semibold text-slate-900">{{ hotel.rating }}</span>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm text-center">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          (click)="editHotel(hotel)"
                          class="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-semibold"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button
                          (click)="deleteHotel(hotel.id)"
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

        <!-- Hotels Cards (Mobile) -->
        <div class="sm:hidden space-y-4">
          @for (hotel of filteredHotels; track hotel.id) {
            <div class="rounded-lg bg-white shadow-md p-4">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="font-bold text-slate-900">{{ hotel.name }}</h3>
                  <p class="text-xs text-slate-600">{{ hotel.city }}, {{ hotel.country }}</p>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                  <span class="text-sm font-semibold text-slate-900">{{ hotel.rating }}</span>
                </div>
              </div>
              <div class="flex gap-2 text-xs text-slate-600 mb-3">
                <span><i class="fas fa-door-open mr-1"></i>{{ hotel.rooms }} hab.</span>
                <span><i class="fas fa-phone mr-1"></i>{{ hotel.phone }}</span>
              </div>
              <div class="flex gap-2">
                <button
                  (click)="editHotel(hotel)"
                  class="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-semibold"
                >
                  <i class="fas fa-edit mr-1"></i>Editar
                </button>
                <button
                  (click)="deleteHotel(hotel.id)"
                  class="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs font-semibold"
                >
                  <i class="fas fa-trash mr-1"></i>Eliminar
                </button>
              </div>
            </div>
          }
        </div>

        @if (filteredHotels.length === 0) {
          <div class="rounded-xl bg-white shadow-md p-8 text-center">
            <i class="fas fa-search text-4xl text-slate-300 mb-4 block"></i>
            <p class="text-slate-600">No se encontraron hoteles</p>
          </div>
        }
      </div>

      <!-- Add/Edit Modal -->
      @if (showModal) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">
              {{ editingHotel ? 'Editar Hotel' : 'Agregar Hotel' }}
            </h2>

            <form (ngSubmit)="saveHotel()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                <input
                  type="text"
                  [(ngModel)]="formData.name"
                  name="name"
                  class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Ciudad</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.city"
                    name="city"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">País</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.country"
                    name="country"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Habitaciones</label>
                  <input
                    type="number"
                    [(ngModel)]="formData.rooms"
                    name="rooms"
                    min="1"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                  <input
                    type="number"
                    [(ngModel)]="formData.rating"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  [(ngModel)]="formData.phone"
                  name="phone"
                  class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  [(ngModel)]="formData.email"
                  name="email"
                  class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Dirección</label>
                <input
                  type="text"
                  [(ngModel)]="formData.address"
                  name="address"
                  class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
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
                  {{ editingHotel ? 'Actualizar' : 'Crear' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </section>
  `,
})
export class HotelsPage implements OnInit {
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  searchQuery = '';
  showModal = false;
  editingHotel: Hotel | null = null;

  formData = {
    name: '',
    city: '',
    country: '',
    rooms: 0,
    rating: 4.5,
    phone: '',
    email: '',
    address: ''
  };

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe(hotels => {
      this.hotels = hotels;
      this.filteredHotels = hotels;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredHotels = this.hotels;
    } else {
      this.hotelService.searchHotels(this.searchQuery).subscribe(hotels => {
        this.filteredHotels = hotels;
      });
    }
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.filteredHotels = this.hotels;
  }

  openAddModal(): void {
    this.editingHotel = null;
    this.formData = {
      name: '',
      city: '',
      country: '',
      rooms: 0,
      rating: 4.5,
      phone: '',
      email: '',
      address: ''
    };
    this.showModal = true;
  }

  editHotel(hotel: Hotel): void {
    this.editingHotel = hotel;
    this.formData = {
      name: hotel.name,
      city: hotel.city,
      country: hotel.country,
      rooms: hotel.rooms,
      rating: hotel.rating,
      phone: hotel.phone,
      email: hotel.email,
      address: hotel.address
    };
    this.showModal = true;
  }

  saveHotel(): void {
    if (this.editingHotel) {
      this.hotelService.updateHotel(this.editingHotel.id, this.formData).subscribe(() => {
        this.loadHotels();
        this.closeModal();
      });
    } else {
      this.hotelService.addHotel(this.formData).subscribe(() => {
        this.loadHotels();
        this.closeModal();
      });
    }
  }

  deleteHotel(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este hotel?')) {
      this.hotelService.deleteHotel(id).subscribe(() => {
        this.loadHotels();
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.editingHotel = null;
  }
}
