import { Component, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, writeBatch, getDocs, QueryConstraint } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Inicializar Base de Datos</h1>
          <p class="text-gray-600 mb-8">Crea datos de ejemplo en Firestore</p>

          <div class="space-y-4">
            <button
              (click)="initializeData()"
              [disabled]="isLoading"
              class="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              {{ isLoading ? 'Inicializando...' : 'Inicializar Datos' }}
            </button>

            <button
              (click)="clearData()"
              [disabled]="isLoading"
              class="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition"
            >
              {{ isLoading ? 'Procesando...' : 'Limpiar Base de Datos' }}
            </button>

            <button
              (click)="goBack()"
              class="w-full px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition"
            >
              Volver
            </button>
          </div>

          @if (message) {
            <div
              [ngClass]="{
                'bg-green-50 border-green-200 text-green-800':
                  messageType === 'success',
                'bg-red-50 border-red-200 text-red-800':
                  messageType === 'error',
              }"
              class="mt-6 p-4 border rounded-lg"
            >
              <p class="font-semibold">{{ messageType === 'success' ? '✓' : '✗' }}</p>
              <p class="mt-2 text-sm">{{ message }}</p>
            </div>
          }

          @if (details) {
            <div class="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 class="font-semibold text-gray-700 mb-3">Detalles:</h3>
              <ul class="text-sm text-gray-600 space-y-2">
                <li>✓ Hoteles creados: {{ details.hoteles }}</li>
                <li>✓ Habitaciones creadas: {{ details.habitaciones }}</li>
                <li>✓ Reservas creadas: {{ details.reservas }}</li>
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class InitPageComponent {
  private firestore = inject(Firestore);
  private router = inject(Router);

  isLoading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';
  details: { hoteles: number; habitaciones: number; reservas: number } | null =
    null;

  async initializeData() {
    this.isLoading = true;
    this.message = '';
    this.details = null;

    try {
      const hotelData = [
        {
          nombre: 'Hotel Paradise',
          ciudad: 'Miami',
          pais: 'USA',
          estrelas: 5,
          descripcion: 'Lujo y confort en la playa',
          precioNoche: 250,
          telefono: '+1-305-555-0001',
          email: 'info@hotelparadise.com',
        },
        {
          nombre: 'Hotel Mountain View',
          ciudad: 'Denver',
          pais: 'USA',
          estrelas: 4,
          descripcion: 'Vistas montañosas increíbles',
          precioNoche: 180,
          telefono: '+1-303-555-0002',
          email: 'info@mountainview.com',
        },
        {
          nombre: 'Hotel Central',
          ciudad: 'Bogotá',
          pais: 'Colombia',
          estrelas: 4,
          descripcion: 'Centro de la ciudad, fácil acceso',
          precioNoche: 120,
          telefono: '+57-1-555-0003',
          email: 'info@hotelcentral.com.co',
        },
      ];

      const habitacionesPorHotel = [
        [
          {
            numero: 101,
            tipo: 'Suite',
            camas: 1,
            maxHuespedes: 2,
            precio: 250,
            servicios: ['WiFi', 'TV', 'Jacuzzi', 'Balcón'],
            estado: 'disponible',
          },
          {
            numero: 102,
            tipo: 'Doble',
            camas: 2,
            maxHuespedes: 4,
            precio: 200,
            servicios: ['WiFi', 'TV', 'Minibar'],
            estado: 'disponible',
          },
          {
            numero: 103,
            tipo: 'Suite Premium',
            camas: 1,
            maxHuespedes: 2,
            precio: 350,
            servicios: ['WiFi', 'TV', 'Jacuzzi', 'Balcón', 'Terraza'],
            estado: 'ocupada',
          },
          {
            numero: 201,
            tipo: 'Doble',
            camas: 2,
            maxHuespedes: 4,
            precio: 200,
            servicios: ['WiFi', 'TV'],
            estado: 'disponible',
          },
          {
            numero: 202,
            tipo: 'Simple',
            camas: 1,
            maxHuespedes: 1,
            precio: 150,
            servicios: ['WiFi', 'TV'],
            estado: 'disponible',
          },
        ],
        [
          {
            numero: 301,
            tipo: 'Suite',
            camas: 1,
            maxHuespedes: 2,
            precio: 180,
            servicios: ['WiFi', 'TV', 'Vista Montaña'],
            estado: 'disponible',
          },
          {
            numero: 302,
            tipo: 'Doble',
            camas: 2,
            maxHuespedes: 4,
            precio: 160,
            servicios: ['WiFi', 'TV'],
            estado: 'disponible',
          },
          {
            numero: 303,
            tipo: 'Suite Familiar',
            camas: 2,
            maxHuespedes: 6,
            precio: 220,
            servicios: ['WiFi', 'TV', 'Cocina', 'Sala'],
            estado: 'disponible',
          },
          {
            numero: 401,
            tipo: 'Simple',
            camas: 1,
            maxHuespedes: 1,
            precio: 100,
            servicios: ['WiFi', 'TV'],
            estado: 'ocupada',
          },
          {
            numero: 402,
            tipo: 'Doble',
            camas: 2,
            maxHuespedes: 4,
            precio: 160,
            servicios: ['WiFi', 'TV'],
            estado: 'disponible',
          },
        ],
        [
          {
            numero: 501,
            tipo: 'Suite',
            camas: 1,
            maxHuespedes: 2,
            precio: 120,
            servicios: ['WiFi', 'TV'],
            estado: 'disponible',
          },
          {
            numero: 502,
            tipo: 'Doble',
            camas: 2,
            maxHuespedes: 4,
            precio: 100,
            servicios: ['WiFi', 'TV'],
            estado: 'disponible',
          },
          {
            numero: 503,
            tipo: 'Simple',
            camas: 1,
            maxHuespedes: 1,
            precio: 70,
            servicios: ['WiFi'],
            estado: 'disponible',
          },
          {
            numero: 601,
            tipo: 'Doble Premium',
            camas: 2,
            maxHuespedes: 4,
            precio: 140,
            servicios: ['WiFi', 'TV', 'Minibar'],
            estado: 'disponible',
          },
          {
            numero: 602,
            tipo: 'Suite',
            camas: 1,
            maxHuespedes: 2,
            precio: 130,
            servicios: ['WiFi', 'TV'],
            estado: 'ocupada',
          },
        ],
      ];

      let totalHabitaciones = 0;
      const hotelIds: string[] = [];

      // Crear hoteles
      for (const hotel of hotelData) {
        const docRef = await addDoc(collection(this.firestore, 'hoteles'), hotel);
        hotelIds.push(docRef.id);
      }

      // Crear habitaciones
      for (let i = 0; i < hotelData.length; i++) {
        for (const habitacion of habitacionesPorHotel[i]) {
          await addDoc(
            collection(
              this.firestore,
              'hoteles',
              hotelIds[i],
              'habitaciones'
            ),
            habitacion
          );
          totalHabitaciones++;
        }
      }

      // Crear reservas
      const reservasData = [
        {
          nombreHuesped: 'Juan García',
          email: 'juan@example.com',
          telefono: '+57-300-555-0001',
          hotelId: hotelIds[0],
          habitacionId: 'habitacion1',
          fechaEntrada: new Date(2026, 5, 15),
          fechaSalida: new Date(2026, 5, 20),
          adultos: 2,
          ninos: 0,
          precioTotal: 1000,
          estado: 'confirmada',
          notas: 'Llegada tardía',
        },
        {
          nombreHuesped: 'María López',
          email: 'maria@example.com',
          telefono: '+57-300-555-0002',
          hotelId: hotelIds[1],
          habitacionId: 'habitacion2',
          fechaEntrada: new Date(2026, 5, 10),
          fechaSalida: new Date(2026, 5, 12),
          adultos: 1,
          ninos: 2,
          precioTotal: 400,
          estado: 'confirmada',
          notas: 'Familia',
        },
      ];

      for (const reserva of reservasData) {
        await addDoc(collection(this.firestore, 'reservas'), reserva);
      }

      this.messageType = 'success';
      this.message =
        '✓ Base de datos inicializada correctamente con datos de ejemplo!';
      this.details = {
        hoteles: hotelData.length,
        habitaciones: totalHabitaciones,
        reservas: reservasData.length,
      };
    } catch (error) {
      this.messageType = 'error';
      this.message =
        '✗ Error inicializando la base de datos: ' +
        (error instanceof Error ? error.message : String(error));
    } finally {
      this.isLoading = false;
    }
  }

  async clearData() {
    if (!confirm('¿Seguro que deseas eliminar todos los datos?')) {
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.details = null;

    try {
      const batch = writeBatch(this.firestore);

      // Limpiar hoteles
      const hotelesSnapshot = await getDocs(collection(this.firestore, 'hoteles'));
      hotelesSnapshot.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });

      // Limpiar reservas
      const reservasSnapshot = await getDocs(collection(this.firestore, 'reservas'));
      reservasSnapshot.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });

      await batch.commit();

      this.messageType = 'success';
      this.message = '✓ Base de datos limpiada correctamente!';
    } catch (error) {
      this.messageType = 'error';
      this.message =
        '✗ Error limpiando la base de datos: ' +
        (error instanceof Error ? error.message : String(error));
    } finally {
      this.isLoading = false;
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
